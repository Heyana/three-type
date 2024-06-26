import { Service } from "./service";
import { Subscription } from "./subscription";

export interface Type {
    readonly explicit?: boolean | undefined;
    readonly foreground?: boolean | undefined;
    readonly persist?: boolean | undefined;
}

export interface Activity {
    readonly description: string;
    readonly name: string;
    readonly type?: Type | undefined;
}

export interface ActivitySpec {
    readonly activity: Activity;
    readonly replace?: boolean | undefined;
    readonly start?: boolean | undefined;
    readonly subscribe?: boolean | undefined;
}

export interface CreateDummyCallback {
    activity: { name: string };
    isDummyActivity: boolean;
}

export class ActivityManager {
    readonly service: Service;

    idleTimeout: number;

    exitOnTimeout: boolean;

    useDummyActivity: boolean;

    constructor(service: Service, idleTimeout: number);

    adopt(activity: Record<string, any>, callback?: (payload: Record<string, any>) => void): void;

    complete(
        activity: Record<string, any>,
        options?: Record<string, any>,
        callback?: (payload: Record<string, any>) => void,
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    ): boolean | void;

    create(spec: string | Record<string, any>, callback: (payload: any) => void): void;

    private readonly _activities: { [id: string]: Subscription };

    private _counter: number;

    private _dummyActivityId: number;

    private _idleTimer: NodeJS.Timeout | null;

    private _add(id: string, activity: Subscription): void;

    private _createActual(activitySpec: ActivitySpec, callback?: (payload: any) => void): void;

    private _createDummy(jobId: string, callback?: (payload: CreateDummyCallback) => void): void;

    private _createInternal(jobId: string, callback?: (payload: any) => void): void;

    private _remove(id: string): void;

    private _startTimer(): void;

    private _stopTimer(): void;
}
