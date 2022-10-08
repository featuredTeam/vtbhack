import { Global, Module } from '@nestjs/common';
import { VtbService } from './vtb.service';

@Global()
@Module({
  controllers: [],
  providers: [VtbService],
  exports: [VtbService],
})
export class VtbModule {}
