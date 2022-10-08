import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { vtbAxios } from './constants/vtbAxios';
import { BalanceType } from './types/BalanceType';
import { WalletType } from './types/WalletType';

@Injectable()
export class VtbService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    if (!process.env.PUBLIC_KEY || !process.env.PRIVATE_KEY) {
      throw new InternalServerErrorException();
    }

    this.privateKey = process.env.PRIVATE_KEY;
    this.publicKey = process.env.PUBLIC_KEY;
  }

  public async register(): Promise<WalletType> {
    const { data } = await vtbAxios.post<WalletType>('/v1/wallets/new');
    await this.giveMatic(data.publicKey, 0.01);
    return data;
  }

  public async balance(publicKey: string): Promise<BalanceType> {
    const { data } = await vtbAxios.get<BalanceType>(
      `/v1/wallets/${publicKey}/balance`,
    );
    return data;
  }

  public async giveMatic(publicKey: string, amount: number): Promise<void> {
    const { data } = await vtbAxios.post(`/v1/transfers/matic`, {
      fromPrivateKey: this.privateKey,
      toPublicKey: publicKey,
      amount,
    });
  }

  public async giveRubles(publicKey: string, amount: number): Promise<void> {
    const { data } = await vtbAxios.post(`/v1/transfers/ruble`, {
      fromPrivateKey: this.privateKey,
      toPublicKey: publicKey,
      amount: amount,
    });
  }

  public async send(
    privateKey: string,
    publicKey: string,
    amount: number,
  ): Promise<void> {
    const { data } = await vtbAxios.post(`/v1/transfers/ruble`, {
      fromPrivateKey: privateKey,
      toPublicKey: publicKey,
      amount,
    });
    console.log(data);
  }

  public async transform(privateKey: string, amount: number): Promise<void> {
    const { data } = await vtbAxios.post(`/v1/transfers/ruble`, {
      fromPrivateKey: privateKey,
      toPublicKey: this.publicKey,
      amount,
    });
  }
}
