class Profile {
  constructor(name, educations, experiences, contactInfo){
    this.name = name
    this.educations = educations
    this.experiences = experiences
    this.contactInfo = contactInfo
  }
}



class Education extends InfoItem{
  constructor(title, institution, startDate, endDate){
    super(title, institution, startDate, endDate)
  }
}

class Experience extends InfoItem{
  constructor(title, institution, startDate, endDate){
    super(title, institution, startDate, endDate)
  }
}

export default Profile

