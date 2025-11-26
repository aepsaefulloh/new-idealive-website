-- =====================================================
-- PUBLIC READ POLICIES FOR FRONTEND PAGES
-- Allows anonymous users to read content without login
-- =====================================================

-- Enable RLS on all content tables
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES (Anyone can read)
-- =====================================================

-- Hero Section: Public read access
DROP POLICY IF EXISTS "Public users can view hero section" ON public.hero_section;
CREATE POLICY "Public users can view hero section"
ON public.hero_section
FOR SELECT
USING (true);

-- About Section: Public read access
DROP POLICY IF EXISTS "Public users can view about section" ON public.about_section;
CREATE POLICY "Public users can view about section"
ON public.about_section
FOR SELECT
USING (true);

-- Contact Info: Public read access
DROP POLICY IF EXISTS "Public users can view contact info" ON public.contact_info;
CREATE POLICY "Public users can view contact info"
ON public.contact_info
FOR SELECT
USING (true);

-- Projects: Public can only view PUBLISHED projects
DROP POLICY IF EXISTS "Public users can view published projects" ON public.projects;
CREATE POLICY "Public users can view published projects"
ON public.projects
FOR SELECT
USING (published = true);

-- Contact Messages: NO public read (admin only via authenticated policies)
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users can view contact messages"
ON public.contact_messages
FOR SELECT
USING (auth.role() = 'authenticated');

-- =====================================================
-- AUTHENTICATED WRITE POLICIES (Admin only)
-- =====================================================

-- Hero Section: Authenticated users can update
DROP POLICY IF EXISTS "Authenticated users can update hero section" ON public.hero_section;
CREATE POLICY "Authenticated users can update hero section"
ON public.hero_section
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- About Section: Authenticated users can update
DROP POLICY IF EXISTS "Authenticated users can update about section" ON public.about_section;
CREATE POLICY "Authenticated users can update about section"
ON public.about_section
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Contact Info: Authenticated users can update
DROP POLICY IF EXISTS "Authenticated users can update contact info" ON public.contact_info;
CREATE POLICY "Authenticated users can update contact info"
ON public.contact_info
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Projects: Authenticated users can manage all projects
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON public.projects;
CREATE POLICY "Authenticated users can manage projects"
ON public.projects
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Contact Messages: Authenticated users can manage
DROP POLICY IF EXISTS "Authenticated users can manage contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated users can manage contact messages"
ON public.contact_messages
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Contact Messages: Anyone can INSERT (submit contact form)
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- =====================================================
-- NOTES:
-- 1. Public users (not logged in) can READ content
-- 2. Only authenticated users can CREATE/UPDATE/DELETE
-- 3. Projects: Only published ones visible to public
-- 4. Contact messages: Public can INSERT, only admin can read
-- =====================================================
