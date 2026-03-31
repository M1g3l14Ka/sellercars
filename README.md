# Million Cars 🚗

Premium used cars from South Korea - scraped from ENCAR.com

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
RESEND_API_KEY="your-resend-api-key"
RECIPIENT_EMAIL="your-email@example.com"
FROM_EMAIL="Million Cars <onboarding@resend.dev>"
```

**Get your Resend API key:**
1. Go to https://resend.com
2. Sign up / Log in
3. Go to API Keys section
4. Create new key
5. Copy to `.env`

### 3. Scrape Car Data
```bash
npm run scrape
```
This will:
- Open mobile version of ENCAR.com
- Scrape 15 real cars with photos, prices, mileage
- Save to `public/data/cars.json`

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 📁 Project Structure

```
million-cars/
├── src/
│   ├── actions/           # Server actions (email sending)
│   │   └── sendEmail.ts
│   ├── app/               # Next.js App Router
│   │   ├── contacts/      # Contact page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Main.tsx       # Car inventory
│   │   ├── Footer.tsx
│   │   └── ContactUsModal.tsx
│   └── types/             # TypeScript types
│       └── types.ts
├── public/
│   └── data/
│       └── cars.json      # Scraped car data
├── scripts/
│   └── scraper.js         # ENCAR web scraper
└── package.json
```

## 🔧 Features

### Web Scraping
- Playwright + Chromium
- Mobile version of ENCAR (less protected)
- Real-time data with images
- Automatic price conversion (×10,000 for 만 won)

### Email Contact Form
- Resend API for email delivery
- Server-side validation
- Success/error feedback
- Reply-to support

### UI/UX
- Responsive design (mobile-first)
- Dark theme with orange accents
- Framer Motion animations
- Equal-height car cards
- Loading states

## 🛡️ Security

- Server-side form validation
- Email format validation
- XSS protection (React escapes by default)
- Environment variables for secrets
- No API keys in client code

## 📊 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Scraping | Playwright |
| Email | Resend |
| Hosting | Vercel |

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend.com API key | Yes (for contact form) |
| `RECIPIENT_EMAIL` | Your email to receive messages | Yes |
| `FROM_EMAIL` | Sender email (use Resend domain) | No |

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables on Vercel:
- Go to Project Settings → Environment Variables
- Add `RESEND_API_KEY`, `RECIPIENT_EMAIL`, `FROM_EMAIL`

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run scrape   # Scrape cars from ENCAR
npm run lint     # Run ESLint
```

## 🌐 Pages

- **/** - Main landing page with car inventory
- **/contacts** - Contact form page

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` or use inline classes:
```tsx
className="text-orange-500" // Change to your brand color
```

### Update Car Data
```bash
npm run scrape  # Get fresh data from ENCAR
```

### Modify Email Template
Edit `src/actions/sendEmail.ts`

## 📄 License

MIT License - feel free to use for learning or commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📞 Support

For issues or questions, create an issue on GitHub or contact the developer.

---

**Built with ❤️ using Next.js, TypeScript, and Playwright**
