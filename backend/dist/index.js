"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const slug_1 = require("./utils/slug");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 8001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/api/links', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const links = yield prisma.link.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(links);
    }
    catch (error) {
        console.error('Failed to fetch links:', error);
        res.status(500).json({ error: 'Failed to fetch links' });
    }
}));
app.post('/api/links', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, slug: customSlug } = req.body;
        if (!url) {
            res.status(400).json({ error: 'URL is required' });
        }
        // URL validation
        try {
            new URL(url);
        }
        catch (err) {
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
            const existingLink = yield prisma.link.findUnique({
                where: { slug },
            });
            if (existingLink) {
                // Make it unique by appending a number
                let counter = 1;
                const baseSlug = slug;
                while (true) {
                    slug = `${baseSlug}-${counter}`;
                    const exists = yield prisma.link.findUnique({
                        where: { slug },
                    });
                    if (!exists)
                        break;
                    counter++;
                }
            }
        }
        else {
            // Generate a random slug
            while (true) {
                slug = (0, slug_1.generateRandomSlug)();
                const existingLink = yield prisma.link.findUnique({
                    where: { slug },
                });
                if (!existingLink)
                    break;
            }
        }
        // Create new link
        const newLink = yield prisma.link.create({
            data: {
                url,
                slug: slug, // Non-null assertion since we ensure it's set above
            },
        });
        res.status(201).json(newLink);
    }
    catch (error) {
        console.error('Failed to create link:', error);
        res.status(500).json({ error: 'Failed to create link' });
    }
}));
// Get link by slug
app.get('/api/links/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const link = yield prisma.link.findUnique({
            where: { slug },
        });
        if (!link) {
            res.status(404).json({ error: 'Link not found' });
        }
        res.json(link);
    }
    catch (error) {
        console.error('Failed to fetch link:', error);
        res.status(500).json({ error: 'Failed to fetch link' });
    }
}));
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
// Server startup
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Graceful shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    process.exit(0);
}));
