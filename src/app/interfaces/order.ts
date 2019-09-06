import { ShellModel } from '../shell/data-store';

export class OrderModel extends ShellModel {
    orderNumber: number;
    orderSource: string;
    orgName: string;
    orderAge?: string;
    orderStatus: string;
    orderSubstatus: string;
    orderTotalDue?: number;
    userInfo?: UserInfo;
    shipping?: Shipping;
    paymentToken?: object;
    products?: Array<Products>;
    address?: string;
    userName?: string;
    date?: string;
    mobilePhoneNumber?: string;
    orderType?: string;
}

export class UserInfo extends ShellModel {
    firstName?: string;
    lastName?: string;
    orgName?: string;
    assignments?: string;
    ranks?: string;
}

export class Shipping extends ShellModel {
    fullName?:  string;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export class Products extends ShellModel {
    userInfo?: UserInfo;
    embellishmentSetup?: Array<object>;
    embellishmentValues?: Array<object>;
    hasLeftChest?: boolean;
    leftChestDisplayText?: string;
    hasRightChest?: boolean;
    rightChestDisplayText?: string;
    hasLeftShoulder?: boolean;
    leftShoulderDisplayText?: string;
    hasRightShoulder?: boolean;
    rightShoulderDisplayText?: string;
    hasTopOfBackEmbellishment?: boolean;
    topOfBackDisplayText?: string;
    hasFullFrontEmbellishment?: boolean;
    fullFrontDisplayText?: string;
    hasTrouserLegs?: boolean;
    trouserLegsDisplayText?: string;
    hasFrontNeck?: boolean;
    frontNeckDisplayText?: string;
    hasFront?: boolean;
    frontDisplayText?: string;
    hasBack?: boolean;
    backDisplayText?: string;
    hasLeftSide?: boolean;
    leftSideDisplayText?: string;
    hasRightSide?: boolean;
    rightSideDisplayText?: string;
    hasEpaulets?: boolean;
    epauletsDisplayText?: string;
    alterationDetails?: Array<object>;
    status?: string;
    lineItemDiscounts?: Array<object>;
    quantity?: number;
    productTitle?: string;
    manufacturer?: string;
    manufacturerNum?: string;
    mainPictureURI?: string;
    alterationRequired?: boolean;
    variant1Name?: string;
    variant1Value?: string;
    variant2Name?: string;
    variant2Value?: string;
    variant3Name?: string;
    variant3Value?: string;
    variant4Name?: string;
    variant4Value?: string;
    variant5Name?: string;
    variant5Value?: string;
    extendedPrice?: number;
    customersProductPrice?: number;
    customizationPriceDetails?: object;
    customizationPrice?: number;
    variants?: Array<VariantModel>;
    customizations?: Array<CustomModel>;
}

export class VariantModel extends ShellModel {
    name: string;
    value: string;
}

export class CustomModel extends ShellModel {
    name: string;
    value: string;
}

export class OrdersToPickModel extends ShellModel {
    status: number;
    orders: Array<OrderModel>;
}
