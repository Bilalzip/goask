GoAskPDF

Talk to your PDFs like a human. Upload a document, get instant context, ask follow‑ups, and move on with your day. That’s the idea behind GoAskPDF.

Why you’ll like it

- Frictionless uploads: drag & drop with a real progress bar. No waiting around, no mysterious spinners.
- Smart context: your PDF is chunked and embedded, so answers refer to the actual content (not wishful thinking).
- A chat that feels right: Markdown, code blocks, footnote‑friendly output, streaming responses, and a tidy UI.
- Pragmatic backend: presigned S3 uploads (no keys in the browser), Pinecone vectors, Neon Postgres + Drizzle.

How it works

1) You drop a PDF (or text/doc). The browser requests a presigned PUT URL from our API and streams the upload directly to S3. 
2) We create a chat, download the file server‑side, parse and split it into chunks, embed them, and upsert vectors into Pinecone.
3) When you ask a question, we fetch relevant chunks from Pinecone, build context, and stream a response back to the UI.

What’s inside

- Next.js App Router (14.x) + TypeScript
- Drizzle ORM + Neon Postgres
- AWS S3 (presigned uploads)
- Pinecone (vector DB)
- React Query for data fetching
- react-markdown + highlight.js for polished chat rendering
- react-toastify for friendly, unobtrusive feedback

Quick start

1) Install
- npm install

2) Env vars (.env)
- DATABASE_URL=postgresql://… (Neon URL; include sslmode=require)
- AWS_REGION=us-east-1 (or your region)
- S3_BUCKET_NAME=your-bucket
- S3_ACCESS_KEY_ID=…
- S3_SECRET_ACCESS_KEY=…
- PINECONE_API_KEY=…
- OPENAI_API_KEY=… (if your chat route uses OpenAI)

3) Database
- npx drizzle-kit push:pg
  (or generate/migrate with drizzle-kit if you prefer migrations)

4) Run
- npm run dev
- Open http://localhost:3000

S3 setup (one minute checklist)

- CORS (Permissions → CORS rules):
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET", "HEAD"],
    "AllowedOrigins": ["http://localhost:3000"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
- Note: CORS doesn’t grant permission. If you open an S3 URL and see AccessDenied, that’s object policy/ACL, not CORS. We use private objects by default.

Commands you’ll actually use

- Dev: npm run dev
- Build: npm run build
- Lint: npm run lint
- DB push: npx drizzle-kit push:pg
- DB studio: npx drizzle-kit studio

A quick tour of the code

- Upload flow
  - API: app/api/s3-presign/route.ts → creates a signed PUT URL
  - Client: src/lib/UploadFile.ts → PUT via XHR, reports progress
  - UI: src/components/dropFiles/DropFiles.tsx → dropzone + progress bar

- Chat flow
  - Create chat: app/api/create-chat/route.ts → downloads from S3, embeds, saves chat
  - Use chat: src/app/chat/[chatId]/page.tsx → chat layout
  - Sidebar: src/components/Document.tsx → recent docs; rename/delete with toasts
  - Thread: src/components/chat-section/Chatsection.tsx + MessageList.tsx → streaming, Markdown, code highlighting, empty/skeleton states

- Profile
  - Page: app/profile/page.tsx → sidebar + content layout
  - Dashboard: src/components/profile/ProfileDash.tsx → profile fields, change password, delete account, and your document list
  - API: app/api/profile/route.ts → GET/PATCH profile basics (name/location/about)
  - Account: app/api/account/change-password + app/api/account/delete

Debugging notes (so you don’t lose an afternoon)

- S3 AccessDenied on GET → this is object permission, not CORS. Either make those objects public or serve via signed GET URLs. Upload still works with presign.
- 403 “HeadersNotSigned” on PUT → don’t send headers (like x-amz-acl) that weren’t in the signature. Current flow doesn’t use ACL.
- Pinecone auth error → check PINECONE_API_KEY and that the index exists in the same project/region.
- Type errors in AWS presigner → the SDK packages sometimes fight over generics. We cast client/command when signing to keep things moving.

Roadmap (the honest kind)

- Inline citations with a compact “Sources” panel
- Better sidebar: search, pinned chats, group by date
- Optional signed GETs for private files (no public S3 access anywhere)
- Cleaning up duplicated file content left from earlier copies

License

Private work in progress. Ask before sharing.
