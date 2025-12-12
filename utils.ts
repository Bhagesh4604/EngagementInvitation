export const generateICSFile = () => {
  const event = {
    title: 'Engagement: Siddharam & Swapna',
    description: 'We invite you to celebrate our engagement with joy and love.',
    location: 'IK Royal Function Hall, Sindagi Road - Almel. Map: https://maps.app.goo.gl/WN99PvNPfMQJkSTV9',
    start: '20251215T180000', // YYYYMMDDTHHmmSS
    end: '20251215T220000',
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SiddharamSwapna//Engagement//EN
BEGIN:VEVENT
UID:${Date.now()}@siddharamswapna.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'siddharam-swapna-engagement.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};