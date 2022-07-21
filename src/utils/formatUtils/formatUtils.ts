import { formatDistanceToNow, parseISO } from 'date-fns';

function fromNow(originDate: Date | string): string {
  const date = (typeof originDate === 'string')
    ? parseISO(originDate)
    : originDate;

  return formatDistanceToNow(date);
}

const formatUtils = {
  fromNow,
};

export {
  formatUtils,
}
