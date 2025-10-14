# Supabase Setup Guide for Attestia.io

This guide will walk you through setting up Supabase for your Attestia.io deployment.

## Prerequisites

- A Supabase account (free tier works perfectly)
- Node.js 18+ installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if you don't have one)
4. Click "New Project"
5. Fill in:
   - **Name**: attestia-io (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier
6. Click "Create new project"
7. Wait 2-3 minutes for project initialization

## Step 2: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql` from this repo
4. Paste it into the SQL editor
5. Click "Run" or press Ctrl/Cmd + Enter
6. You should see "Success. No rows returned" - this is normal!

## Step 3: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click "New bucket"
3. Enter:
   - **Name**: `attestations`
   - **Public bucket**: OFF (unchecked)
   - **File size limit**: 10 MB
   - **Allowed MIME types**: Leave empty (allows all types)
4. Click "Create bucket"

## Step 4: Set Up Storage Policies

1. Click on the `attestations` bucket you just created
2. Go to **Policies** tab
3. Click "New Policy" for each of the following:

### Policy 1: Users can upload own files (INSERT)
- **Policy Name**: Users can upload own files
- **Policy Command**: INSERT
- **Target Roles**: authenticated
- **USING expression**:
```sql
bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text
```
- Click "Review" then "Save policy"

### Policy 2: Users can read own files (SELECT)
- **Policy Name**: Users can read own files
- **Policy Command**: SELECT
- **Target Roles**: authenticated
- **USING expression**:
```sql
bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text
```
- Click "Review" then "Save policy"

### Policy 3: Users can update own files (UPDATE)
- **Policy Name**: Users can update own files
- **Policy Command**: UPDATE
- **Target Roles**: authenticated
- **USING expression**:
```sql
bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text
```
- Click "Review" then "Save policy"

### Policy 4: Users can delete own files (DELETE)
- **Policy Name**: Users can delete own files
- **Policy Command**: DELETE
- **Target Roles**: authenticated
- **USING expression**:
```sql
bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text
```
- Click "Review" then "Save policy"

## Step 5: Configure Authentication

1. Go to **Authentication** > **Providers** in the left sidebar
2. **Email** should already be enabled
3. To enable **Google OAuth** (recommended):
   - Click on "Google" under "Auth Providers"
   - Toggle "Enable Google provider"
   - You'll need to:
     - Create a Google Cloud Project
     - Enable Google+ API
     - Create OAuth 2.0 credentials
     - Add your Supabase callback URL to authorized redirect URIs
   - Copy your Google Client ID and Client Secret
   - Paste them into Supabase
   - Click "Save"

### Google OAuth Setup (Detailed)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth Client ID"
5. Choose "Web application"
6. Add authorized redirect URI:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - Find your project ref in Supabase Settings > General
7. Copy Client ID and Client Secret to Supabase

## Step 6: Get Your Environment Variables

1. Go to **Settings** (left sidebar, bottom) > **API**
2. Copy the following values:

### Project URL
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
```

### anon/public key
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### service_role key (Keep this secret!)
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 7: Configure Your App

1. In your project root, create a `.env.local` file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and paste your values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
```

3. Save the file

## Step 8: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Open http://localhost:3000
3. Try to sign up with an email
4. Check your Supabase **Authentication** > **Users** to see the new user
5. Try creating an attestation
6. Check **Database** > **attestations** table to see the record
7. Check **Storage** > **attestations** bucket to see the uploaded file

## Troubleshooting

### "Failed to upload file" error
- Check that the storage bucket exists and is named exactly `attestations`
- Verify storage policies are set up correctly
- Check browser console for specific error messages

### "Failed to save attestation" error
- Verify the database schema was created (check **Database** > **Tables**)
- Ensure RLS policies are enabled
- Check browser console for specific error messages

### Authentication not working
- Verify environment variables are set correctly
- Restart your dev server after changing .env.local
- Check Supabase **Authentication** > **Providers** are enabled

### Can't see attestations in dashboard
- Make sure you're logged in
- Check RLS policies are enabled on attestations table
- Verify the user_id matches your current user

## Next Steps

Once everything is working:
1. Test all features (create, verify, share)
2. Deploy to Vercel (see main README.md)
3. Update environment variables in Vercel dashboard
4. Enable custom domain (optional)

## Support

If you encounter issues:
- Check Supabase logs: **Logs** in left sidebar
- Check browser console for errors
- Review Supabase documentation: https://supabase.com/docs
- Open an issue on GitHub

## Security Notes

⚠️ **Important Security Reminders:**
- Never commit `.env.local` to git
- Never share your `service_role` key publicly
- The `anon` key is safe to use in client-side code
- RLS policies protect your data even if keys are exposed
- Regularly rotate your service role key in production

