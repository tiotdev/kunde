/*
 * Copyright (C) 2017 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import * as shell from 'shelljs'

import { beep, dir } from './shared'

const tslint = 'npx --no-install tslint'

const force = ''
// const force = '--force'

// const project = ''
const project = '--project tsconfig.json'

const { code } = shell.exec(`${tslint} ${force} ${project} ${dir.src}/**/*.ts`)

if (code !== 0) {
    beep()
}