export interface NewOwnerRequest {
    name: string;
    contactDetails: {
      address: string;
      phoneNumber: string;
      email: string;
    };
    notes?: string;
  }