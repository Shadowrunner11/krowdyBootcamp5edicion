import schema from 'schm';

const profileSchema = schema({
  name       : String,
  educations : [educationSchema],
  experience : [experienceSchema],
  contactInfo: contactInfoSchema,
});

const contactInfoSchema = schema({
  $type                    : String,
  address                  : String,
  birthDateOn              : String,
  birthdayVisibilitySetting: Boolean,
  connectedAt              : Date,
  emailAddress             : String,
  entityUrn                : String,
  ims                      : String,
  interests                : [String],
  phoneNumbers             : [String],
  primaryTwitterHandle     : String,
  sesameCreditGradeInfo    : String,
  twitterHandles           : [String],
  weChatContactInfo        : String,
  websites                 : [String]
});

const educationSchema = schema({
  title      : String,
  institution: String,
  startDate  : Date,
  endDate    : Date
});

const experienceSchema = schema({
  title     : String,
  enterprise: String,
  startDate : Date,
  endDate   : Date
});

export default profileSchema;

