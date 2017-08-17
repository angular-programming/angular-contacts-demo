import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  let pipe: PhonePipe;
  beforeEach(() => {
    pipe = new PhonePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms phone', () => {
    expect(pipe.transform('13566666666')).toEqual('135-6666-6666');
  });
});
