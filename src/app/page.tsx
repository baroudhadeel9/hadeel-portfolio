import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { HomeContent } from '@/components/home/HomeContent';

// Static Data Imports
import profileData from '../../data/profile.json';
import certificatesData from '../../data/certificates.json';
import projectsData from '../../data/projects.json';
import skillsData from '../../data/skills.json';

// Zod Schemas & Types
import {
  CertificateSchema,
  ProjectSchema,
  ProfileSchema,
  SkillsDataSchema,
  type CertificateItem,
  type ProjectItem,
  type ProfileData,
  type SkillsData,
} from '@/lib/schemas';

// Server-side Zod validation of static datasets
const parsedProjects: ProjectItem[] = ProjectSchema.array().parse(projectsData);
const parsedCertificates: CertificateItem[] = CertificateSchema.array().parse(certificatesData);
const parsedProfile: ProfileData = ProfileSchema.parse(profileData);
const parsedSkills: SkillsData = SkillsDataSchema.parse(skillsData);

export default function HomePage() {
  return (
    <LocaleProvider>
      <HomeContent
        profile={parsedProfile}
        projects={parsedProjects}
        certificates={parsedCertificates}
        skillsData={parsedSkills}
      />
    </LocaleProvider>
  );
}
