/* eslint-disable @typescript-eslint/no-unused-vars */
import { Program, ProgramForService } from '../models/Programs';

export function transformProgramForService({
  id,
  ...programForService
}: Program): ProgramForService {
  return programForService;
}
