const formatFullname = (firstName: string, lastName: string): string => {
  let first = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
  let last = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();

  return `${first} ${last}`;
};

export default formatFullname;
