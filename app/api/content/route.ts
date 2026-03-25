import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { defaultSiteContent } from "@/data/site-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json(defaultSiteContent);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });

  const [aboutRes, projectsRes, experienceRes, techRes] = await Promise.all([
    supabase
      .from("about_content")
      .select("intro,details,cv_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("projects")
      .select("title,description,tech,image_url,image_urls,demo,repo")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("experience")
      .select("years,title,company,summary")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("tech_stack")
      .select("name")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  const hasError =
    aboutRes.error ||
    projectsRes.error ||
    experienceRes.error ||
    techRes.error;
  if (hasError) {
    return NextResponse.json(defaultSiteContent);
  }

  const about = aboutRes.data
    ? {
        intro: aboutRes.data.intro || defaultSiteContent.about.intro,
        details: aboutRes.data.details || defaultSiteContent.about.details,
        cvUrl: aboutRes.data.cv_url || defaultSiteContent.about.cvUrl,
      }
    : defaultSiteContent.about;

  const projects = (projectsRes.data || []).map((p) => ({
    title: p.title,
    description: p.description,
    tech: Array.isArray(p.tech) ? p.tech : [],
    imageUrl: p.image_url || "",
    imageUrls: Array.isArray(p.image_urls)
      ? p.image_urls.filter((url): url is string => Boolean(url))
      : [],
    demo: p.demo || "",
    repo: p.repo || "",
  }));

  const experience = (experienceRes.data || []).map((item) => ({
    years: item.years,
    title: item.title,
    company: item.company,
    summary: item.summary,
  }));

  const techStack = (techRes.data || [])
    .map((item) => item.name)
    .filter((item): item is string => Boolean(item));

  return NextResponse.json({
    about,
    projects,
    experience,
    techStack,
  });
}
