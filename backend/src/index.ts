  import express, { Request, Response, NextFunction } from 'express';
  import cors from 'cors';
  import { PrismaClient } from '@prisma/client';
  import { generateRandomSlug } from './utils/slug';
  import { LinkCreateInput } from './types/types';
  
  const app = express();
  const prisma = new PrismaClient();
  const PORT = process.env.PORT || 8001;
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.get('/api/links', async (_req: Request, res: Response) => {
    try {
      const links = await prisma.link.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      res.json(links);
    } catch (error) {
      console.error('Failed to fetch links:', error);
      res.status(500).json({ error: 'Failed to fetch links' });
    }
  });
  
  app.post('/api/links', async (req: Request<{}, {}, LinkCreateInput>, res: Response) => {
    try {
      const { url, slug: customSlug } = req.body;
      
      if (!url) {
         res.status(400).json({ error: 'URL is required' });
      }
      
      // URL validation
      try {
        new URL(url);
      } catch (err) {
         res.status(400).json({ error: 'Invalid URL format' });
      }
      
      let slug = customSlug;
      
      // If custom slug is provided, check if it exists
      if (slug) {
        // Check if slug meets requirements
        if (slug.length < 4 || !/^[a-zA-Z0-9-_]+$/.test(slug)) {
           res.status(400).json({ 
            error: 'Slug must be at least 4 characters and contain only letters, numbers, hyphens, and underscores' 
          });
        }
        
        // Check if slug exists
        const existingLink = await prisma.link.findUnique({
          where: { slug },
        });
        
        if (existingLink) {
          // Make it unique by appending a number
          let counter = 1;
          const baseSlug = slug;
          
          while (true) {
            slug = `${baseSlug}-${counter}`;
            
            const exists = await prisma.link.findUnique({
              where: { slug },
            });
            
            if (!exists) break;
            counter++;
          }
        }
      } else {
        // Generate a random slug
        while (true) {
          slug = generateRandomSlug();
          
          const existingLink = await prisma.link.findUnique({
            where: { slug },
          });
          
          if (!existingLink) break;
        }
      }
      
      // Create new link
      const newLink = await prisma.link.create({
        data: {
          url,
          slug: slug!, // Non-null assertion since we ensure it's set above
        },
      });
      
      res.status(201).json(newLink);
    } catch (error) {
      console.error('Failed to create link:', error);
      res.status(500).json({ error: 'Failed to create link' });
    }
  });
  
  // Get link by slug
  app.get('/api/links/:slug', async (req: Request<{slug: string}>, res: Response) => {
    try {
      const { slug } = req.params;
      
      const link = await prisma.link.findUnique({
        where: { slug },
      });
      
      if (!link) {
         res.status(404).json({ error: 'Link not found' });
      }
      
      res.json(link);
    } catch (error) {
      console.error('Failed to fetch link:', error);
      res.status(500).json({ error: 'Failed to fetch link' });
    }
  });
  
  // Error handling middleware
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
  
  // Server startup
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  // Graceful shutdown
  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });