export interface HousingLocation {

    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
    latitude: number;
    longitude: number;
    satisfaction: number,
    countOvVote: number,
  }