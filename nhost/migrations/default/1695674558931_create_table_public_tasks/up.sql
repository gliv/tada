CREATE TABLE public.tasks (_id uuid NOT NULL, title varchar NOT NULL, description text, is_done bool DEFAULT 'false' NOT NULL, PRIMARY KEY (_id));
