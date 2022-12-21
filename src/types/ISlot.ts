interface ITime {
  start: string;
  end: string;
}

interface ISlot {
  date: string;
  slots: ITime[];
}

export type { ISlot };
