/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { createLogger, format, transports } from 'winston'

// Winston: seit 2010 bei GoDaddy (Registrierung von Domains)
// Log-Levels: error, warn, info, debug, verbose, silly, ...
// Medien (= Transports): Console, File, ...
// https://github.com/winstonjs/winston/blob/master/docs/transports.md
// Alternative: Bunyan, Pino

const { combine, simple, timestamp } = format

const commonFormat = combine(
    timestamp(),
    // colorize(),
    // https://github.com/winstonjs/logform
    simple(),
)

const { NODE_ENV } = process.env
const consoleOptions = { level: NODE_ENV === 'production' ? 'error' : 'info' }
const fileOptions = {
    filename: 'server.log',
    level: 'debug',
    // 250 KB
    maxsize: 250000,
    maxFiles: 3,
}

const { Console, File } = transports
export const logger = createLogger({
    format: commonFormat,
    transports: [new Console(consoleOptions), new File(fileOptions)],
})

if (NODE_ENV === 'production') {
    logger.info('Logging durch Winston ist konfiguriert')
} else {
    logger.debug('Logging durch Winston ist konfiguriert: Level Info')
}
