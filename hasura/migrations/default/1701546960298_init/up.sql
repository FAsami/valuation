SET check_function_bodies = false;
CREATE SCHEMA question;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.chapter (
    id integer NOT NULL,
    title text NOT NULL,
    meta jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "subjectId" integer NOT NULL
);
CREATE SEQUENCE public.chapter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.chapter_id_seq OWNED BY public.chapter.id;
CREATE TABLE public.classes (
    id integer NOT NULL,
    title text NOT NULL,
    meta jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.classes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.classes_id_seq OWNED BY public.classes.id;
CREATE TABLE public."examPresets" (
    id integer NOT NULL,
    title text NOT NULL,
    "totalMarks" integer NOT NULL,
    "questionWeight" integer DEFAULT 1 NOT NULL,
    "negativeMarkWeight" integer DEFAULT 0.25 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "time" integer DEFAULT 450000
);
COMMENT ON TABLE public."examPresets" IS 'This will store questions preset';
CREATE SEQUENCE public."examPresets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."examPresets_id_seq" OWNED BY public."examPresets".id;
CREATE TABLE public."examPresets_subject" (
    id integer NOT NULL,
    "subjectId" integer NOT NULL,
    "examPresetId" integer NOT NULL,
    "totalMarks" integer NOT NULL,
    "isOptional" boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public."examPresets_subject" IS 'This will map preset with individual subject';
CREATE SEQUENCE public."examPresets_subject_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."examPresets_subject_id_seq" OWNED BY public."examPresets_subject".id;
CREATE TABLE public.plan (
    id integer NOT NULL,
    title text NOT NULL,
    price integer NOT NULL,
    validity integer NOT NULL,
    meta jsonb NOT NULL
);
COMMENT ON TABLE public.plan IS 'This table will store plan related information';
CREATE SEQUENCE public.plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.plan_id_seq OWNED BY public.plan.id;
CREATE TABLE public.question (
    id integer NOT NULL,
    content jsonb NOT NULL,
    "subjectId" integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    "classId" integer NOT NULL,
    "chapterId" integer NOT NULL,
    "topicId" integer
);
COMMENT ON TABLE public.question IS 'This table is for storing the the questions related informations';
CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;
CREATE TABLE public.subject (
    id integer NOT NULL,
    title text NOT NULL,
    meta jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    "classId" integer NOT NULL
);
COMMENT ON TABLE public.subject IS 'This will store all the subjects';
CREATE SEQUENCE public.subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.subject_id_seq OWNED BY public.subject.id;
CREATE TABLE public.topic (
    id integer NOT NULL,
    title text NOT NULL,
    meta jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "chapterId" integer NOT NULL
);
CREATE SEQUENCE public.topic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.topic_id_seq OWNED BY public.topic.id;
CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    email text,
    address jsonb,
    "institutionInfo" jsonb,
    "planId" integer,
    "phoneNo" text,
    avatar text,
    class text,
    CONSTRAINT "Both phone no and email is empty" CHECK (((NOT (("phoneNo" IS NULL) AND (email IS NULL))) AND (("phoneNo" IS NOT NULL) OR (email IS NOT NULL))))
);
COMMENT ON TABLE public.users IS 'This will record users ';
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.chapter ALTER COLUMN id SET DEFAULT nextval('public.chapter_id_seq'::regclass);
ALTER TABLE ONLY public.classes ALTER COLUMN id SET DEFAULT nextval('public.classes_id_seq'::regclass);
ALTER TABLE ONLY public."examPresets" ALTER COLUMN id SET DEFAULT nextval('public."examPresets_id_seq"'::regclass);
ALTER TABLE ONLY public."examPresets_subject" ALTER COLUMN id SET DEFAULT nextval('public."examPresets_subject_id_seq"'::regclass);
ALTER TABLE ONLY public.plan ALTER COLUMN id SET DEFAULT nextval('public.plan_id_seq'::regclass);
ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);
ALTER TABLE ONLY public.subject ALTER COLUMN id SET DEFAULT nextval('public.subject_id_seq'::regclass);
ALTER TABLE ONLY public.topic ALTER COLUMN id SET DEFAULT nextval('public.topic_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT chapter_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."examPresets"
    ADD CONSTRAINT "examPresets_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."examPresets_subject"
    ADD CONSTRAINT "examPresets_subject_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_chapter_updated_at BEFORE UPDATE ON public.chapter FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_chapter_updated_at ON public.chapter IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_classes_updated_at ON public.classes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_examPresets_subject_updated_at" BEFORE UPDATE ON public."examPresets_subject" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_examPresets_subject_updated_at" ON public."examPresets_subject" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER "set_public_examPresets_updated_at" BEFORE UPDATE ON public."examPresets" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_examPresets_updated_at" ON public."examPresets" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_question_updated_at BEFORE UPDATE ON public.question FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_question_updated_at ON public.question IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_subject_updated_at BEFORE UPDATE ON public.subject FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_subject_updated_at ON public.subject IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_topic_updated_at BEFORE UPDATE ON public.topic FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_topic_updated_at ON public.topic IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
