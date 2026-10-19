export const committeeDetails = {
  formationDate: "9 May 2026",
  term: "one-year term",
  establishedYear: 2024,
  location: "Darmstadt, Germany",
};

export const leadership = [
  { number: "01", name: "Md. Rifad Ahmed", role: "Convener" },
  { number: "11", name: "Md. Mizanur Rahman", role: "Member Secretary" },
];

export const jointConveners = [
  "Al Nahiyan",
  "Hasan Al Banna",
  "Arnab Das",
  "Ibnul Farezi",
  "Muktadir Kafi",
  "Abir Iqbal",
  "Al Galib Kabir",
  "Saidur Rahman",
  "Ahsan Nirjhor",
].map((name, index) => ({
  number: String(index + 2).padStart(2, "0"),
  name,
  role: "Joint Convener",
}));

export const committeeMembers = [
  "Samrat Mia",
  "Al Biruni Reza",
  "Antu Saha",
  "Taifur Rahman Hridoy",
  "Niaz Kobir Enan",
  "Jahirul Islam Arman",
  "Saiful Islam",
  "Sowhardo Hossain Kabbo",
  "Sayem Al Hasan",
].map((name, index) => ({
  number: String(index + 12).padStart(2, "0"),
  name,
  role: "Member",
}));

export const advisoryBoard = [
  "Pritom Saha",
  "Imdadul Haque Nayeem",
  "Tahrim Eshrak",
  "Showkat Murad",
  "Rakib Sizar",
  "Mahbub Rony",
  "Bayezidul Islam",
  "Md Asifur Rahman",
].map((name, index) => ({
  number: String(index + 1).padStart(2, "0"),
  name,
  role: "Advisor",
}));
