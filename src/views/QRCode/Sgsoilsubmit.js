function handleSubmit (e) {
    e.preventDefault();

    const dateStartFormatted = dateStart.replace(/-/g, "");
    const dateEndFormatted = dateEnd.replace(/-/g, "")

    setQrText(`BEGIN:VCALENDAR\nBEGIN:VEVENT\nDTSTART:${dateStartFormatted}\nDTEND:${dateEndFormatted}\nSUMMARY:${title}\nEND:VEVENT\nEND:VCALENDAR`);

    return false;
  }