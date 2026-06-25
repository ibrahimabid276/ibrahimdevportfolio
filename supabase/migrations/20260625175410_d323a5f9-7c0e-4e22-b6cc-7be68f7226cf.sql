
-- Replace the permissive "true" INSERT policy with one that validates input,
-- and add an explicit restrictive SELECT policy so messages cannot be read by anyone via the Data API.

DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can submit a validated contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND length(email) BETWEEN 3 AND 254
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Explicit deny for SELECT from public roles. Only service_role (server-side) may read.
CREATE POLICY "No public read of contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

-- Ensure anon cannot SELECT at the grant level either.
REVOKE SELECT ON public.contact_messages FROM anon, authenticated;
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
