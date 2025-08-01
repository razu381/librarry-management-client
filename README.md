# Dreamer Den - Library Management System 📚

A modern library management system built with React, TypeScript, Redux Toolkit Query, and Tailwind CSS. This application allows users to manage books, handle borrowing operations, and view borrow summaries without authentication.

- [Backend Repository](https://github.com/razu381/libarary-management-server)
- [Live Demo](link-to-live-demo)

## ✨ Features

### 📖 Book Management

- **View Books**: Display all books in a responsive table format
- **Add Books**: Create new books with detailed information
- **Edit Books**: Update existing book details with optimistic UI updates
- **Delete Books**: Remove books with confirmation dialogs
- **Book Details**: View comprehensive information about individual books

### 📋 Borrow Management

- **Borrow Books**: Select books and specify quantity and due dates
- **Borrow Summary**: View aggregated data of all borrowed books
- **Availability Tracking**: Real-time updates of book availability

### 🎨 User Experience

- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Toast Notifications**: Real-time feedback for user actions
- **Optimistic Updates**: Immediate UI updates for better user experience
- **Type Safety**: Full TypeScript support throughout the application

## 🛠️ Tech Stack

| **Category**     | **Technology**                      |
| ---------------- | ----------------------------------- |
| Frontend         | React 19 + TypeScript               |
| State Management | Redux Toolkit + RTK Query           |
| Styling          | Tailwind CSS + Shadcn/ui Components |
| Forms            | React Hook Form + Zod Validation    |
| Routing          | React Router v7                     |
| Build Tool       | Vite                                |
| Icons            | Lucide React                        |
| Notifications    | React Toastify                      |
| Alerts           | SweetAlert2                         |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── book/           # Book-related components
│   │   ├── BookForm.tsx
│   │   ├── BookTable.tsx
│   │   └── BorrowForm.tsx
│   ├── layout/         # Layout components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/             # Shadcn/ui components
├── pages/              # Page components
│   ├── BookListPage.tsx
│   ├── BookDetailPage.tsx
│   ├── CreateBookPage.tsx
│   ├── EditBookPage.tsx
│   ├── BorrowBookPage.tsx
│   └── BorrowSummaryPage.tsx
├── Redux/              # State management
│   ├── api/           # RTK Query APIs
│   │   ├── baseApi.ts
│   │   ├── booksApi.ts
│   │   └── borrowApi.ts
│   └── store.ts
├── interfaces/         # TypeScript interfaces
├── hooks/             # Custom hooks
├── router/            # Routing configuration
└── lib/               # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/razu381/librarry-management-client
   cd library-management-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run lint`    | Run ESLint               |
| `npm run preview` | Preview production build |

## 🌐 API Integration

The application integrates with a RESTful API for book and borrow management:

- **Base URL**: `http://localhost:3000/api/`
- **Books API**: `/books` - CRUD operations for books
- **Borrow API**: `/borrow` - Borrow operations and summaries

### API Endpoints Used

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | `/books`     | Fetch all books      |
| GET    | `/books/:id` | Fetch book by ID     |
| POST   | `/books`     | Create new book      |
| PUT    | `/books/:id` | Update book          |
| DELETE | `/books/:id` | Delete book          |
| POST   | `/borrow`    | Create borrow record |
| GET    | `/borrow`    | Get borrow summary   |

## 📱 Pages & Routes

| Route             | Component         | Description                       |
| ----------------- | ----------------- | --------------------------------- |
| `/books`          | BookListPage      | Display all books in table format |
| `/create-book`    | CreateBookPage    | Form to add new books             |
| `/books/:id`      | BookDetailPage    | Detailed view of a single book    |
| `/edit-book/:id`  | EditBookPage      | Form to edit existing books       |
| `/borrow/:bookId` | BorrowBookPage    | Form to borrow a book             |
| `/borrow-summary` | BorrowSummaryPage | View borrow statistics            |

## 🎯 Key Features Implementation

### Optimistic Updates

- Immediate UI updates for book creation, editing, and deletion
- Automatic rollback on API failure
- Enhanced user experience with instant feedback

### Form Validation

- Zod schema validation for type-safe forms
- Real-time validation feedback
- Consistent error handling across all forms
