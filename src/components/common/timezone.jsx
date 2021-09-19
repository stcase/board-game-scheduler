function gmtToLocalTime(gmtHour, gmtOffset) {
  return mod(gmtHour + gmtOffset, 24);
}

function mod(n, m) {
  // Fix the mod bug with negative numbers
  return ((n % m) + m) % m;
}

export default gmtToLocalTime;
