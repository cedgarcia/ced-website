import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  "logo": logo.asset->url,
  email,
  phone,
  address,
  socialLinks[]{
    platform,
    url,
    label
  },
  "resumeFile": resumeFile.asset->url,
  "seoImage": seoImage.asset->url
}`;

export const homepageQuery = groq`*[_type == "homepage"][0]{
  heroTitle,
  heroSubtitle,
  "heroImage": heroImage.asset->url,
  heroCTAText,
  heroCTALink,
  aboutTitle,
  aboutText,
  "aboutImage": aboutImage.asset->url,
  skills,
  showFeaturedProjects,
  featuredProjectsTitle,
  showLatestBlogs,
  latestBlogsTitle,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  title,
  "profileImage": profileImage.asset->url,
  bio,
  experience[]{
    title,
    company,
    "companyLogo": companyLogo.asset->url,
    "companyLogoAlt": companyLogo.alt,
    location,
    startDate,
    endDate,
    current,
    description,
    technologies
  },
  skillCategories[]{
    category,
    skills[]{
      name,
      level
    }
  }
}`;
