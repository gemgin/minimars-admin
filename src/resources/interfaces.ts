export enum BookingStatus {
  PENDING = "pending",
  BOOKED = "booked",
  IN_SERVICE = "in_service",
  PENDING_REFUND = "pending_refund",
  FINISHED = "finished",
  CANCELED = "canceled"
}

export enum BookingType {
  PLAY = "play",
  PARTY = "party",
  EVENT = "event",
  GIFT = "gift",
  FOOD = "food"
}

export enum CardStatus {
  PENDING = "pending", // pending payment for the card
  VALID = "valid", // paid gift card before activated
  ACTIVATED = "activated", // paid non-gift card / activated gift card
  EXPIRED = "expired", // expired period, times empty, credit deposit to user
  CANCELED = "canceled" // never used and will never be activated
}

export enum PaymentGateway {
  Balance = "balance",
  Points = "points",
  Card = "card",
  Coupon = "coupon",
  Scan = "scan",
  Cash = "cash",
  WechatPay = "wechatpay",
  Alipay = "alipay",
  UnionPay = "unionpay"
}

export interface Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

type Populated<T> = T | null;

export interface Booking extends Model {
  customer: Populated<User>;
  store: Populated<Store>;
  type: BookingType;
  date: string;
  checkInAt: string;
  adultsCount: number;
  kidsCount: number;
  socksCount: number;
  bandsPrinted: number;
  status: BookingStatus;
  price?: number;
  priceInPoints?: number;
  card?: Populated<Card>;
  coupon?: Populated<Coupon>;
  event?: Populated<Event>;
  gift?: Populated<Gift>;
  quantity?: number;
  payments?: Populated<Payment>[];
  remarks?: string;
}

export interface Card extends Model {
  customer: Populated<User>;
  timesLeft: number;
  num?: string;
  status: CardStatus;
  payments?: Payment[];
  giftCode?: string;
  title: string;
  slug: string;
  type: string;
  isGift: boolean;
  store?: string;
  content: string;
  times: number;
  start: Date;
  end: Date;
  balance: number;
  price: number;
  maxKids: number;
  freeParentsPerKid: number;
  overPrice?: number;
  discountPrice?: number;
  discountRate?: number;
}

export interface CardType extends Model {
  title: string;
  slug: string;
  type: string;
  isGift: boolean;
  store?: Populated<Store>;
  content: string;
  times: number;
  start: Date;
  end: Date;
  balance: number;
  price: number;
  maxKids: number;
  freeParentsPerKid: number;
  openForClient: boolean;
  customerTags: string[];
  maxPerCustomer?: number;
  overPrice?: number;
  discountPrice?: number;
  discountRate?: number;
}

export interface Coupon extends Model {
  title: string;
  store?: Populated<Store>;
  content: string;
  kidsCount: number;
  price: number;
  priceThirdParty: number;
  freeParentsPerKid: number;
  start: Date;
  end: Date;
  enabled: true;
}

export interface Config {
  sockPrice?: number;
  extraParentFullDayPrice?: number;
  kidFullDayPrice?: number;
  freeParentsPerKid?: number;
  user?: User;
  stores?: Store[];
  cardTypes?: CardType[];
  coupons?: Coupon[];
}

export interface ConfigItem extends Model, Record<string, any> {
  desc: string;
  value: any;
}

export interface Event extends Model {
  title: string;
  content?: string;
  posterUrl: string | null;
  kidsCountMax: number | null;
  kidsCountLeft: number | null;
  props?: Record<string, any>;
  priceInPoints: number;
  price?: number;
  date: Date;
  store: Populated<Store>;
}

export interface File extends Model {
  uri: string;
  thumbnailUrl: string;
  name: string;
  url: string;
}

export interface Gift extends Model {
  title: string;
  content: string;
  posterUrl: string | null;
  quantity: number;
  priceInPoints: number;
  price?: number;
  store: Populated<Store>;
}

export interface Payment extends Model {
  customer: Populated<User>;
  amount: number;
  amountForceDeposit?: number;
  amountDeposit?: number;
  amountInPoints?: number;
  paid: boolean;
  title: string;
  attach: string;
  gateway: PaymentGateway;
  gatewayData: { [key: string]: any };
  original?: string;
}

export interface Post extends Model {
  title: string;
  slug?: string;
  content: string;
  tags: string[];
  posterUrl: string | null;
  target?: string;
  author: Populated<User>;
}

export interface Store extends Model {
  name: string;
  address: string;
  phone: string;
  content: string;
  posterUrl: string;
  partyRooms: number;
  ip: string;
}

export interface User extends Model {
  role: string;
  login?: string;
  password?: string;
  name?: string;
  mobile?: string;
  avatarUrl?: string;
  region?: string;
  country?: string;
  isForeigner?: boolean;
  birthday?: string;
  constellation?: string;
  idCardNo?: string;
  openid?: string;
  store?: Populated<Store>;
  balanceDeposit?: number;
  balanceReward?: number;
  balance: number;
  points?: number;
  cardType?: string;
  cardNo?: string;
  cards: Card[];
}

export interface AuthLoginPostBody {
  login: string;
  password: string;
}

export interface AuthLoginResponseBody {
  token: string;
  user: User;
}

export interface ListQuery {
  order?: string;
  limit?: number;
  skip?: number;
}

export interface ListResponseBase {
  $headers: Record<string, string>;
}

export interface AuthTokenUserIdResponseBody extends AuthLoginResponseBody {}

export interface BookingPostBody extends Booking {}

export interface BookingPutBody extends Booking {}

export interface BookingPostQuery {
  paymentGateway?: PaymentGateway;
  useBalance?: "false";
  adminAddWithoutPayment?: boolean;
}

export interface BookingQuery extends ListQuery {
  status?: string | string[]; // support comma separated values
  customerKeyword?: string;
  type?: string;
  store?: string;
  date?: string;
  customer?: string;
  event?: string;
  gift?: string;
  coupon?: string;
}

export interface BookingPricePostBody extends Booking {}

export interface BookingPriceResponseBody {
  price: number;
  priceInPoints?: number;
}

export interface CardPostBody extends Card {}

export interface CardPutBody extends Card {}

export interface CardPostQuery {
  paymentGateway?: PaymentGateway;
  adminAddWithoutPayment?: boolean;
}

export interface CardQuery extends ListQuery {
  status?: string; // support comma separated values
  customer?: string;
}

export interface CardTypePostBody extends CardType {}

export interface CardTypePutBody extends CardType {}

export interface CardTypeQuery extends ListQuery {}

export interface EventPostBody extends Event {}

export interface EventPutBody extends Event {}

export interface EventQuery extends ListQuery {
  keyword?: string;
  store?: string;
}

export interface GiftPostBody extends Gift {}

export interface GiftPutBody extends Gift {}

export interface GiftQuery extends ListQuery {
  keyword?: string;
  store?: string;
}

export interface PaymentPostBody extends Payment {}

export interface PaymentPutBody extends Payment {}

export interface PaymentQuery extends ListQuery {
  date?: string;
  paid?: "false";
  customer?: string;
  attach?: string;
  gateway?: PaymentGateway;
  direction?: "payment" | "refund";
}

export interface PostPostBody extends Post {}

export interface PostPutBody extends Post {}

export interface PostQuery extends ListQuery {
  slug?: string;
  tag?: string;
}

export interface StorePostBody extends Store {}

export interface StorePutBody extends Store {}

export interface StoreQuery extends ListQuery {}

export interface UserPostBody extends User {}

export interface UserPutBody extends User {}

export interface UserQuery extends ListQuery {
  keyword: string;
  role: string;
  membership: string[];
  cardTypes: string[];
}
