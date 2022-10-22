export default (str: string) => Array.from(str).map(char => {
  switch(char) {
    case '&':
      return '&amp;';
    case '"':
      return '&quot;';
    case '\'':
      return '&#39;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    default:
      return char;
  }
}).join('');