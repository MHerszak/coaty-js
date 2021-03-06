﻿/*! Copyright (c) 2018 Siemens AG. Licensed under the MIT License. */

import { IoStateEvent } from "../../com";
import { IoActorController } from "../../io";
import { IoActor } from "../../model";

export interface IoActorLogger {
    values: any[];
    stateEvents: IoStateEvent[];
}

export class MockIoActorController extends IoActorController {

    logActor(actor: IoActor, logger: IoActorLogger) {
        if (!logger.stateEvents) {
            logger.stateEvents = [];
        }
        if (!logger.values) {
            logger.values = [];
        }

        this.communicationManager
            .observeIoState(actor)
            .subscribe(event => {
                logger.stateEvents.push(event);
            });

        this.communicationManager.observeIoValue(actor)
            .subscribe(value => {
                logger.values.push(value);
            });
    }

}
