-- =====================================================
-- Attestia.io Database Schema
-- =====================================================
-- This file contains the complete database schema for Attestia.io
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Attestations table
CREATE TABLE IF NOT EXISTS public.attestations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    attestation_id TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL,
    file_hash TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Index on user_id for faster user queries
CREATE INDEX IF NOT EXISTS idx_attestations_user_id 
ON public.attestations(user_id);

-- Index on attestation_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_attestations_attestation_id 
ON public.attestations(attestation_id);

-- Index on file_hash for faster verification
CREATE INDEX IF NOT EXISTS idx_attestations_file_hash 
ON public.attestations(file_hash);

-- Index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_attestations_created_at 
ON public.attestations(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE public.attestations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own attestations
CREATE POLICY "Users can view own attestations" 
ON public.attestations 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can create their own attestations
CREATE POLICY "Users can create own attestations" 
ON public.attestations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own attestations
CREATE POLICY "Users can update own attestations" 
ON public.attestations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy: Users can delete their own attestations
CREATE POLICY "Users can delete own attestations" 
ON public.attestations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Policy: Allow public read access for verification by hash or ID
CREATE POLICY "Public can verify by hash or attestation_id" 
ON public.attestations 
FOR SELECT 
USING (true);

-- =====================================================
-- STORAGE BUCKET
-- =====================================================

-- Create storage bucket for attestations (Run this in Supabase Dashboard > Storage)
-- Bucket name: attestations
-- Public: false
-- File size limit: 10 MB
-- Allowed MIME types: all

-- Storage policies for attestations bucket
-- Note: These need to be created via the Supabase Dashboard > Storage > Policies

-- 1. "Users can upload own files" - INSERT policy
--    Expression: bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text

-- 2. "Users can read own files" - SELECT policy  
--    Expression: bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text

-- 3. "Users can update own files" - UPDATE policy
--    Expression: bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text

-- 4. "Users can delete own files" - DELETE policy
--    Expression: bucket_id = 'attestations' AND (storage.foldername(name))[1] = auth.uid()::text

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_attestations_updated_at
    BEFORE UPDATE ON public.attestations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE QUERIES (for testing)
-- =====================================================

-- Get all attestations for a user
-- SELECT * FROM public.attestations WHERE user_id = 'your-user-id' ORDER BY created_at DESC;

-- Verify an attestation by hash
-- SELECT * FROM public.attestations WHERE file_hash = 'sha256-hash-here';

-- Verify an attestation by ID
-- SELECT * FROM public.attestations WHERE attestation_id = 'ATT-1234567890-ABCD1234';

-- Get attestation count by user
-- SELECT user_id, COUNT(*) as total_attestations FROM public.attestations GROUP BY user_id;

