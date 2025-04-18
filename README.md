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
