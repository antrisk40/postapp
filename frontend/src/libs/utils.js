export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function handleApiError(error) {
  const message = error?.response?.data?.error || error?.message || 'Unexpected error';
  return message;
}

export function toFormData(obj) {
  const formData = new FormData();
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}


