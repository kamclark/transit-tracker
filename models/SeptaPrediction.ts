// models/SeptaPrediction.ts

import type { RawPrediction } from "./rawArrivals";

export interface ISeptaPrediction {
    trainId: string;
    origin: string;
    destination: string;
    line: string;
    status: string;
    serviceType: string;
    nextStation?: string;
    scheduledTime: Date;
    departTime: Date;
    track: string;
}

export class SeptaPrediction implements ISeptaPrediction {
    trainId: string;
    origin: string;
    destination: string;
    line: string;
    status: string;
    serviceType: string;
    nextStation?: string;
    scheduledTime: Date;
    departTime: Date;
    track: string;

    constructor(raw: RawPrediction) {
        this.trainId = raw.train_id;
        this.origin = raw.origin;
        this.destination = raw.destination;
        this.line = raw.line;
        this.status = raw.status;
        this.serviceType = raw.service_type;
        this.nextStation = raw.next_station ?? undefined;
        this.scheduledTime = new Date(raw.sched_time);
        this.departTime = new Date(raw.depart_time);
        this.track = raw.track;
    }
}
