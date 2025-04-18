# Link Shortener Application

This is a full-stack application for creating and managing short, branded links. The application allows users to generate custom slugs for their links, view a list of created links, and redirect users to the original URL when accessing a short link.

## Features

- **Create Short Links**: Users can create short links with custom or randomly generated slugs.
- **View Links**: A list of all created links is displayed on the dashboard.
- **Redirect**: Short links redirect users to the original URL.
- **Validation**: Ensures valid URLs and unique slugs.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Utilities**: React Hot Toast for notifications

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Yarn or npm
- Prisma CLI (`npm install -g prisma`)

---
Folder Structure

Backend
index.ts: Main server file with API routes.
utils/slug.ts: Utility function to generate random slugs.
prisma/schema.prisma: Prisma schema for the database.

Frontend
components: Reusable UI components like Hero, LinkForm, and LinkList.
pages: Next.js pages, including LandingPage, CreateLink, and dynamic slug redirects.

How It Works

Landing Page: 
The Hero component introduces the app and provides a call-to-action button to create links.
Create Link: The LinkForm component allows users to input a URL and optional slug. The backend validates and stores the link in the database.
View Links: The LinkList component displays all created links fetched from the backend.
Redirect: The [slug].tsx page fetches the original URL for a given slug and redirects the user.

-----
### 1. Clone the Repository

```bash
git clone https://github.com/ppratik07/next-backend.git
cd next-backend

2. Install Dependencies
Backend
cd backend
npm install

Frontend
 cd frontend
npm install

Create Environmental Variables

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
PORT=8001

SETUP DATABASE
cd backend
npx prisma migrate dev --name init
npx prisma generate
//You can start it without setting the ddatabase ,but it will not save the data to backend .

START APPLICATION 
cd backend
npm run dev

cd frontend
npm run dev

-----
