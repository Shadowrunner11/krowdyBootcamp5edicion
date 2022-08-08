/* eslint-disable max-len */
export const mockProfiles = [
  'https://www.linkedin.com/in/piero-sandro-0206?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADE17_kBJj4XmHhDKVQ-24OXAdpYNAsv678',
  'https://www.linkedin.com/in/phool-antony-herrera-condezo-143004205?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADQl68MB7PhbkYUmF_5Ik_NOeMsXMi14Yu4',
  'https://www.linkedin.com/in/robert-landeo-89b82a192?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC1UKncB8kq6AQ-12PxxsIz721tovmrzAA0',
  'https://www.linkedin.com/in/alexanderpontereynaldo?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADCliKUB0ZlykGYr5n3Vz-0l9ZOJN2ggKhU',
  'https://www.linkedin.com/in/wilmerdelgadoalama?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADDRnnMB47zSFCpYDQEs3_HOfdMwKLwsK58',
  'https://www.linkedin.com/in/juan-antoni-cabanillas-chuquiruna-20a449174?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAClbMeoBtze_3t93kjNQtAmAG0d_JNuApsw',
  'https://www.linkedin.com/in/alicia-rodriguez-carbajal-54a563148?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACOteUoBkJX9OiEslMhtDc9dhUqAoD6_SHM',
  'https://www.linkedin.com/in/christopher-villanueva-704a37180?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACreHjQBlKSuvDLf_S-7O_H3X7zW1yu_zs0',
  'https://www.linkedin.com/in/wdanielaguilar?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC4Z_N0BPXyH2DFj44yAKQ3GdjnojgBTvMk',
  'https://www.linkedin.com/in/clifford-g%C3%A1rate-5260b01b6?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADI0He4BN0ea9tAfmMcrNlTSEsdmAAAKkro'
];

export const mockResponseProfiles = mockProfiles.map(profile => ({
  raw       : profile,
  profileVar: profile.match(/urn.+/)[0].replace('miniP','p').replace('Afs','Afsd')
}));