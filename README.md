# Attestia.io - The Trust Layer for Global Transactions

<div align="center">

![Attestia.io](https://img.shields.io/badge/Attestia.io-Trust%20Layer-0047FF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Free%20Tier-3ECF8E?style=for-the-badge&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Attest, verify, and share proof with confidence — across any industry.**

[Live Demo](https://attestia.io) • [Documentation](./SUPABASE_SETUP.md) • [Report Bug](https://github.com/Attestia-io/attestia.io/issues) • [Request Feature](https://github.com/Attestia-io/attestia.io/issues)

</div>

---

## 🌟 Overview

**Attestia.io** is a universal digital attestation and verification platform that enables users and organizations to prove, verify, and share trust in any digital transaction or document — instantly and securely.

### Key Features

✅ **Universal Trust Layer** - Works across legal, finance, healthcare, HR, supply chain, real estate, and more  
✅ **Cryptographic Proof** - SHA-256 hashing ensures document integrity  
✅ **No Blockchain Required** - Fast, free, and environmentally friendly  
✅ **Instant Verification** - Verify documents in under 1 second  
✅ **QR Code Sharing** - Generate shareable verification links and QR codes  
✅ **100% Free & Open Source** - No hidden fees, no vendor lock-in  
✅ **Enterprise-Ready API** - RESTful API for seamless integration (coming soon)  
✅ **Dark/Light Mode** - Beautiful UI with modern design

---

## 🚀 Tech Stack (All Free Tier)

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Next.js 15** | Frontend Framework | React-based, SSR, excellent DX |
| **TypeScript** | Type Safety | Catches errors at compile time |
| **Tailwind CSS** | Styling | Utility-first, fast, responsive |
| **ShadCN UI** | Component Library | Beautiful, accessible components |
| **Framer Motion** | Animations | Smooth, professional animations |
| **Supabase** | Backend & Database | PostgreSQL, Auth, Storage - all free |
| **Vercel** | Deployment | Zero-config, edge functions, free SSL |
| **GitHub Actions** | CI/CD | Automated testing and deployment |

---

## 📦 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Supabase account** (free tier)
- **Vercel account** (free tier, for deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Attestia-io/attestia.io.git
cd attestia.io/attestia-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. **Set up Supabase database**

Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🗄️ Database Schema

The application uses a simple, efficient schema:

### Tables

**`attestations`**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `attestation_id` (TEXT, unique) - e.g., "ATT-1699564321-A1B2C3D4"
- `file_name` (TEXT)
- `file_hash` (TEXT) - SHA-256 hash
- `file_type` (TEXT)
- `file_size` (BIGINT)
- `file_path` (TEXT) - Supabase Storage path
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Storage Buckets

**`attestations`** - Stores uploaded documents (private, user-scoped)

See [supabase/schema.sql](./supabase/schema.sql) for the complete schema.

---

## 🏗️ Project Structure

```
attestia-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── login/             # Authentication
│   │   ├── signup/
│   │   ├── dashboard/         # User dashboard
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── create/        # Create attestation
│   │   │   └── share/[id]/    # Share with QR code
│   │   ├── verify/            # Public verification
│   │   ├── api/               # API routes
│   │   │   └── v1/
│   │   │       ├── attestations/
│   │   │       ├── verify/
│   │   │       └── users/
│   │   └── auth/callback/     # OAuth callback
│   ├── components/            # React components
│   │   ├── ui/               # ShadCN components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── lib/                  # Utilities
│   │   ├── supabase/        # Supabase clients
│   │   ├── utils.ts         # Helper functions
│   │   └── hash.ts          # SHA-256 hashing
│   └── hooks/               # Custom React hooks
├── supabase/
│   └── schema.sql           # Database schema
├── public/                  # Static assets
├── .env.example            # Environment template
├── SUPABASE_SETUP.md       # Setup guide
└── README.md              # You are here
```

---

## 🎨 Features & Screenshots

### 1. **Landing Page**
- Award-winning design inspired by Stripe, Linear, Notion
- Animated hero section with glassmorphism effects
- How It Works, Features, Industries sections
- Testimonials and security information

### 2. **Authentication**
- Email/password signup and login
- Google OAuth integration
- Supabase Auth with JWT tokens
- Protected routes with middleware

### 3. **Dashboard**
- View all attestations
- Search and filter functionality
- Sort by date, type
- Statistics (total attestations, monthly count, storage used)

### 4. **Create Attestation**
- Upload files (PDF, DOCX, PNG, JPG, etc.)
- Or paste text directly
- Real-time SHA-256 hash generation
- Success modal with attestation details
- Instant verification link

### 5. **Public Verification**
- Verify by uploading file
- Verify by pasting text
- Lookup by attestation ID
- ✅ Verified or ❌ Not Found results
- No login required

### 6. **Share & QR Codes**
- Generate QR codes for any attestation
- Download QR code as PNG
- Copy verification link
- Share via email
- Beautiful, responsive design

---

## 🔐 Security

### Cryptographic Hashing
- **SHA-256** hashing for all documents
- Same standard used by governments and financial institutions
- 256-bit security ensures integrity

### Authentication
- **Supabase Auth** with JWT tokens
- Google OAuth support
- Row Level Security (RLS) on all tables
- Secure session management

### Storage
- **Private by default** - users can only access their own files
- Files stored in Supabase with user-scoped paths
- **SOC 2 Type 2** compliant infrastructure
- **AES-256** encryption at rest

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
   - Click "Deploy"

3. **Update OAuth Callback URLs**
   - Add your Vercel URL to Supabase > Authentication > URL Configuration
   - Format: `https://your-app.vercel.app/auth/callback`

4. **Done!** Your app is live 🎉

### Environment Variables

Make sure to set these in your Vercel dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🛣️ Roadmap

### ✅ MVP Features (Current)
- [x] User authentication (email + Google)
- [x] Create attestations (file upload + text)
- [x] Public verification
- [x] Dashboard with filters and search
- [x] QR code generation
- [x] Dark/light mode
- [x] Responsive design

### 🚧 Coming Soon
- [ ] API Key Management
- [ ] Webhook support for verification events
- [ ] Batch attestation operations
- [ ] Custom branding for organizations
- [ ] Blockchain integration (optional)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile apps (iOS/Android)

### 💡 Future Ideas
- [ ] Attestation templates
- [ ] Team collaboration features
- [ ] Audit logs
- [ ] Compliance certifications (HIPAA, GDPR)
- [ ] White-label solution

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Supabase** - For the amazing open-source backend platform
- **Vercel** - For the best deployment experience
- **ShadCN UI** - For beautiful, accessible components
- **Next.js** - For the incredible React framework
- **Open Source Community** - For making this possible

---

## 📧 Contact

- **Website**: [attestia.io](https://attestia.io)
- **GitHub**: [@Attestia-io](https://github.com/Attestia-io)
- **Email**: contact@attestia.io
- **Twitter**: [@AttestiaIO](https://twitter.com/AttestiaIO)

---

## 💎 Support the Project

If you find Attestia.io useful, please consider:

- ⭐ **Star this repository**
- 🐦 **Share on Twitter**
- 📝 **Write a blog post**
- 🤝 **Contribute code**
- ☕ **Sponsor the project**

---

<div align="center">

**Built with ❤️ by the Attestia.io team**

[Website](https://attestia.io) • [GitHub](https://github.com/Attestia-io) • [Docs](./SUPABASE_SETUP.md)

</div>
