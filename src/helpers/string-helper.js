function capitalizeWord (input) {
  return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export { capitalizeWord}