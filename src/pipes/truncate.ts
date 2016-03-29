/*
 * Source + Example: http://plnkr.co/edit/Y3in02HYKneMNeotN6Nv?p=info
 */

import { Pipe } from 'angular2/core'

@Pipe({ name: 'truncate' })
export class Truncate {
    transform(value: string, args: string[]) : string {
        let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
        let trail = args.length > 1 ? args[1] : '...';

        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
