import { Countries } from './Countries';

enum profileType {
  Individual = 'Individual',
  Collective = 'Collective',
  Institution = 'Institution',
  Public = 'Public'
}

export interface Profile {
  id: string;
  cognito_uuid: string | null;
  contributors: string[] | null;
  profile_image: string | null;
  featured_image: string | null;
  full_name: string | null;
  field_expertise: string;
  city: string | null;
  country: Countries | null;
  biography: string | null;
  website: string | null;
  social_media: string[] | null;
  public_profile: boolean;
  affiliation: string | null;
  position: string | null;
  contact_person: string | null;
  contact_position: string | null;
  contact_email: string | null;
  profile_type: profileType | null;
  accepted_license: boolean | null;
}
