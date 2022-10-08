import { Injectable } from '@nestjs/common';
import { vtbAxios } from './constants/vtbAxios';
import { BalanceType } from './types/BalanceType';
import { WalletType } from './types/WalletType';

@Injectable()
export class VtbService {
  constructor() {}

  public async register(): Promise<WalletType> {
    const { data } = await vtbAxios.post<WalletType>('/v1/wallets/new');
    return data;
  }

  public async balance(publicKey: string): Promise<BalanceType> {
    const { data } = await vtbAxios.get<BalanceType>(
      `/v1/wallets/${publicKey}/balance`,
    );
    return data;
  }
}
