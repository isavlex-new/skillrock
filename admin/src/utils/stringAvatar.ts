
// util for generate avatar color from string 

function stringToColor(string : string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  export function stringAvatar(name: string, width = 40, height = 40, fs = '24px') {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width,
        height,
        fontSize: fs
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }