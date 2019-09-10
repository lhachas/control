import { Injectable, Request, Response, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//     use(req: any, res: any, next: () => void) {
//         throw new Error("Method not implemented.");
//     }
//     resolve(name: string): MiddlewareConsumer {
//         // tslint:disable-next-line: ban-types
//         return (req: Request, res: Response, next: Function) => {
//             try {
//                 const offucateRequest = JSON.parse(JSON.stringify(req.body));
//             } catch (error) {
//                 next();
//             }
//         };
//     }
// }
