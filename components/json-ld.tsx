import { education, experience, siteConfig, skillGroups } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

/** schema.org Person markup for rich results. Skips any value still marked TODO. */
export function PersonJsonLd() {
  const siteUrl = getSiteUrl();
  const current = experience[0];
  const school = education[0];

  const sameAs = siteConfig.socials
    .map((s) => s.href)
    .filter((href) => href.startsWith("http") && !href.includes("TODO"));

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    ...(siteConfig.email.startsWith("TODO") ? {} : { email: `mailto:${siteConfig.email}` }),
    ...(siteConfig.photo.src.startsWith("TODO") ? {} : { image: `${siteUrl}${siteConfig.photo.src}` }),
    ...(sameAs.length ? { sameAs } : {}),
    ...(current
      ? {
          worksFor: {
            "@type": "Organization",
            name: current.company,
            ...(current.companyUrl ? { url: current.companyUrl } : {}),
          },
        }
      : {}),
    ...(school
      ? {
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: school.institution,
            ...(school.institutionUrl ? { url: school.institutionUrl } : {}),
          },
        }
      : {}),
    knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => skill.name)),
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is inert data; escaping "<" prevents any early </script> termination.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
