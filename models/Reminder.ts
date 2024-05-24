export interface IReminder {
  title: string;
  note: string;
  dateTime: Date;
}

export class Reminder {
  public id: string;
  public title: string;
  public note: string;
  public dateTime: Date;

  constructor(construct: IReminder) {
    this.id = new Date().toUTCString();
    this.title = construct.title;
    this.note = construct.note;
    this.dateTime = construct.dateTime;
  }
}
