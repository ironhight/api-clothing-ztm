import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
    static permissions;

    constructor() {
        PermissionService.permissions = {
            allow: [
                {
                    group: 'Log',
                    items: {
                        [Permissions.log_list]: 'View',
                    },
                },
                {
                    group: 'Setting',
                    items: {
                        [Permissions.setting_list]: 'View',
                        [Permissions.setting_update]: 'Update',
                    },
                },
                {
                    group: 'Filemanager',
                    items: {
                        [Permissions.file_manager_list]: 'List file manager',
                        [Permissions.file_manager_detail]: 'Detail file manager',
                        [Permissions.file_manager_add]: 'Add file manager',
                        [Permissions.file_manager_edit]: 'Edit file manager',
                        [Permissions.file_manager_delete]: 'Delete file manager',
                    },
                },
                {
                    group: 'Province',
                    items: {
                        [Permissions.zone_province_list]: 'List province',
                        [Permissions.zone_province_detail]: 'Detail province',
                        [Permissions.zone_province_add]: 'Add province',
                        [Permissions.zone_province_edit]: 'Edit province',
                        [Permissions.zone_province_delete]: 'Delete province',
                        [Permissions.zone_province_sync]: 'Sync province',
                    },
                },
                {
                    group: 'District',
                    items: {
                        [Permissions.zone_district_list]: 'List district',
                        [Permissions.zone_district_detail]: 'Detail district',
                        [Permissions.zone_district_add]: 'Add district',
                        [Permissions.zone_district_edit]: 'Edit district',
                        [Permissions.zone_district_delete]: 'Delete district',
                        [Permissions.zone_district_sync]: 'Sync district',
                    },
                },
                {
                    group: 'Ward',
                    items: {
                        [Permissions.zone_ward_list]: 'List ward',
                        [Permissions.zone_ward_detail]: 'Detail ward',
                        [Permissions.zone_ward_add]: 'Add ward',
                        [Permissions.zone_ward_edit]: 'Edit ward',
                        [Permissions.zone_ward_delete]: 'Delete ward',
                        [Permissions.zone_ward_sync]: 'Sync ward',
                    },
                },
                {
                    group: 'Page',
                    items: {
                        [Permissions.page_list]: 'List page',
                        [Permissions.page_detail]: 'Detail page',
                        [Permissions.page_edit]: 'Edit page',
                    },
                },
                {
                    group: 'User',
                    items: {
                        [Permissions.user_list]: 'List user',
                        [Permissions.user_detail]: 'Detail user',
                        [Permissions.user_add]: 'Add user',
                        [Permissions.user_edit]: 'Edit user',
                        [Permissions.user_delete]: 'Delete user',
                    },
                },
                {
                    group: 'Role',
                    items: {
                        [Permissions.role_list]: 'List role',
                        [Permissions.role_detail]: 'Detail role',
                        [Permissions.role_add]: 'Add role',
                        [Permissions.role_edit]: 'Edit role',
                        [Permissions.role_delete]: 'Delete role',
                    },
                },
                {
                    group: 'Customer',
                    items: {
                        [Permissions.customer_list]: 'List customer',
                        [Permissions.customer_detail]: 'Detail customer',
                        [Permissions.customer_add]: 'Add customer',
                        [Permissions.customer_edit]: 'Edit customer',
                        [Permissions.customer_delete]: 'Delete customer',
                    },
                },
                {
                    group: 'Project',
                    items: {
                        [Permissions.project_list]: 'List project',
                        [Permissions.project_detail]: 'Detail project',
                        [Permissions.project_add]: 'Add project',
                        [Permissions.project_edit]: 'Edit project',
                        [Permissions.project_delete]: 'Delete project',
                    },
                },
                {
                    group: 'Job Contract',
                    items: {
                        [Permissions.job_contract_list]: 'List job contract',
                        [Permissions.job_contract_detail]: 'Detail job contract',
                        [Permissions.job_contract_add]: 'Add job contract',
                        [Permissions.job_contract_edit]: 'Edit job contract',
                        [Permissions.job_contract_delete]: 'Delete job contract',
                    },
                },
                {
                    group: 'Job Department',
                    items: {
                        [Permissions.job_department_list]: 'List job department',
                        [Permissions.job_department_detail]: 'Detail job department',
                        [Permissions.job_department_add]: 'Add job department',
                        [Permissions.job_department_edit]: 'Edit job department',
                        [Permissions.job_department_delete]: 'Delete job department',
                    },
                },
                {
                    group: 'Job Location',
                    items: {
                        [Permissions.job_location_list]: 'List job location',
                        [Permissions.job_location_detail]: 'Detail job location',
                        [Permissions.job_location_add]: 'Add job location',
                        [Permissions.job_location_edit]: 'Edit job location',
                        [Permissions.job_location_delete]: 'Delete job location',
                    },
                },
                {
                    group: 'Job',
                    items: {
                        [Permissions.job_list]: 'List job',
                        [Permissions.job_detail]: 'Detail job',
                        [Permissions.job_add]: 'Add job',
                        [Permissions.job_edit]: 'Edit job',
                        [Permissions.job_delete]: 'Delete job',
                    },
                },

                {
                    group: 'Job Applicant',
                    items: {
                        [Permissions.job_applicant_list]: 'List job applicant',
                        [Permissions.job_applicant_detail]: 'Detail job applicant',
                        [Permissions.job_applicant_add]: 'Add job applicant',
                        [Permissions.job_applicant_edit]: 'Edit job applicant',
                        [Permissions.job_applicant_delete]: 'Delete job applicant',
                    },
                },
                {
                    group: 'Job Setting',
                    items: {
                        [Permissions.job_setting_list]: 'List job setting',
                        [Permissions.job_setting_detail]: 'Detail job setting',
                        [Permissions.job_setting_add]: 'Add job setting',
                        [Permissions.job_setting_edit]: 'Edit job setting',
                        [Permissions.job_setting_delete]: 'Delete job setting',
                    },
                },
                {
                    group: 'Product Category',
                    items: {
                        [Permissions.product_category_list]: 'List',
                        [Permissions.product_category_detail]: 'Detail',
                        [Permissions.product_category_add]: 'Add',
                        [Permissions.product_category_edit]: 'Edit',
                        [Permissions.product_category_delete]: 'Delete',
                    },
                },
                {
                    group: 'Page',
                    items: {
                        [Permissions.page_list]: 'List page',
                        [Permissions.page_detail]: 'Detail page',
                        [Permissions.page_edit]: 'Edit page',
                    },
                },
                {
                    group: 'Tag',
                    items: {
                        [Permissions.tag_list]: 'List tag',
                        [Permissions.tag_detail]: 'Detail tag',
                        [Permissions.tag_add]: 'Add tag',
                        [Permissions.tag_edit]: 'Edit tag',
                        [Permissions.tag_delete]: 'Delete tag',
                    },
                },
                {
                    group: 'PostCategory',
                    items: {
                        [Permissions.post_category_list]: 'List post category',
                        [Permissions.post_category_detail]: 'Detail post category',
                        [Permissions.post_category_add]: 'Add post category',
                        [Permissions.post_category_edit]: 'Edit post category',
                        [Permissions.post_category_delete]: 'Delete post category',
                    },
                },
                {
                    group: 'Post',
                    items: {
                        [Permissions.post_list]: 'List post',
                        [Permissions.post_detail]: 'Detail post',
                        [Permissions.post_add]: 'Add post',
                        [Permissions.post_edit]: 'Edit post',
                        [Permissions.post_delete]: 'Delete post',
                    },
                },
                {
                    group: 'EditorialCategory',
                    items: {
                        [Permissions.editorial_category_list]: 'List editorial category',
                        [Permissions.editorial_category_detail]: 'Detail editorial category',
                        [Permissions.editorial_category_add]: 'Add editorial category',
                        [Permissions.editorial_category_edit]: 'Edit editorial category',
                        [Permissions.editorial_category_delete]: 'Delete editorial category',
                    },
                },
                {
                    group: 'Editorial',
                    items: {
                        [Permissions.editorial_list]: 'List editorial',
                        [Permissions.editorial_detail]: 'Detail editorial',
                        [Permissions.editorial_add]: 'Add editorial',
                        [Permissions.editorial_edit]: 'Edit editorial',
                        [Permissions.editorial_delete]: 'Delete editorial',
                    },
                },
                {
                    group: 'EditorialSetting',
                    items: {
                        [Permissions.editorial_setting_list]: 'List editorial setting',
                        [Permissions.editorial_setting_detail]: 'Detail editorial setting',
                        [Permissions.editorial_setting_add]: 'Add editorial setting',
                        [Permissions.editorial_setting_edit]: 'Edit editorial setting',
                        [Permissions.editorial_setting_delete]: 'Delete editorial setting',
                    },
                },
                {
                    group: 'Subscribe',
                    items: {
                        [Permissions.subscribe_list]: 'List subscribe',
                        [Permissions.subscribe_detail]: 'Detail subscribe',
                        [Permissions.subscribe_add]: 'Add subscribe',
                        [Permissions.subscribe_edit]: 'Edit subscribe',
                        [Permissions.subscribe_delete]: 'Delete subscribe',
                    },
                },
                {
                    group: 'Contact',
                    items: {
                        [Permissions.contact_list]: 'List contact',
                        [Permissions.contact_detail]: 'Detail contact',
                        [Permissions.contact_add]: 'Add contact',
                        [Permissions.contact_edit]: 'Edit contact',
                        [Permissions.contact_delete]: 'Delete contact',
                    },
                },
                {
                    group: 'PaymentMethod',
                    items: {
                        [Permissions.payment_method_list]: 'Payment method list',
                        [Permissions.payment_method_detail]: 'Payment method detail',
                        [Permissions.payment_method_add]: 'Payment method add',
                        [Permissions.payment_method_edit]: 'Payment method edit',
                        [Permissions.payment_method_delete]: 'Payment method delete',
                    },
                },
                {
                    group: 'DeliveryMethod',
                    items: {
                        [Permissions.delivery_method_list]: 'Delivery method list',
                        [Permissions.delivery_method_detail]: 'Delivery method detail',
                        [Permissions.delivery_method_add]: 'Delivery method add',
                        [Permissions.delivery_method_edit]: 'Delivery method edit',
                        [Permissions.delivery_method_delete]: 'Delivery method delete',
                    },
                },
                {
                    group: 'ShippingFee',
                    items: {
                        [Permissions.shipping_fee_list]: 'Shipping fee list',
                        [Permissions.shipping_fee_detail]: 'Shipping fee detail',
                        [Permissions.shipping_fee_add]: 'Shipping fee add',
                        [Permissions.shipping_fee_edit]: 'Shipping fee edit',
                        [Permissions.shipping_fee_delete]: 'Shipping fee delete',
                    },
                },
                {
                    group: 'Area',
                    items: {
                        [Permissions.area_list]: 'Area list',
                        [Permissions.area_detail]: 'Area detail',
                        [Permissions.area_add]: 'Area add',
                        [Permissions.area_edit]: 'Area edit',
                        [Permissions.area_delete]: 'Area delete',
                    },
                },
                {
                    group: 'Promotion',
                    items: {
                        [Permissions.area_list]: 'Promotion list',
                        [Permissions.area_detail]: 'Promotion detail',
                        [Permissions.area_add]: 'Promotion add',
                        [Permissions.area_edit]: 'Promotion edit',
                        [Permissions.area_delete]: 'Promotion delete',
                    },
                },
                {
                    group: 'Partner',
                    items: {
                        [Permissions.partner_list]: 'Partner list',
                        [Permissions.partner_detail]: 'Partner detail',
                        [Permissions.partner_add]: 'Partner add',
                        [Permissions.partner_edit]: 'Partner edit',
                        [Permissions.partner_delete]: 'Partner delete',
                    },
                },
                {
                    group: 'PartnerSetting',
                    items: {
                        [Permissions.partner_setting_detail]: 'Partner setting detail',
                        [Permissions.partner_setting_edit]: 'Partner setting edit',
                    },
                },
                {
                    group: 'CustomerCare',
                    items: {
                        [Permissions.customer_care_list]: 'Customer care list',
                        [Permissions.customer_care_detail]: 'Customer care detail',
                        [Permissions.customer_care_add]: 'Customer care add',
                        [Permissions.customer_care_edit]: 'Customer care edit',
                        [Permissions.customer_care_delete]: 'Customer care delete',
                    },
                },
                {
                    group: 'CustomerCareType',
                    items: {
                        [Permissions.customer_care_type_list]: 'Customer care type list',
                        [Permissions.customer_care_type_detail]: 'Customer care type detail',
                        [Permissions.customer_care_type_add]: 'Customer care type add',
                        [Permissions.customer_care_type_edit]: 'Customer care type edit',
                        [Permissions.customer_care_type_delete]: 'Customer care type delete',
                    },
                },
                {
                    group: 'CustomerCareSetting',
                    items: {
                        [Permissions.customer_care_setting_list]: 'Customer care type list',
                        [Permissions.customer_care_setting_detail]: 'Customer care type detail',
                        [Permissions.customer_care_setting_add]: 'Customer care type add',
                        [Permissions.customer_care_setting_edit]: 'Customer care type edit',
                        [Permissions.customer_care_setting_delete]: 'Customer care type delete',
                    },
                },
                {
                    group: 'Store',
                    items: {
                        [Permissions.store_list]: 'Store list',
                        [Permissions.store_detail]: 'Store detail',
                        [Permissions.store_add]: 'Store add',
                        [Permissions.store_edit]: 'Store edit',
                        [Permissions.store_delete]: 'Store delete',
                    },
                },
                {
                    group: 'StoreSetting',
                    items: {
                        [Permissions.store_setting_list]: 'Store setting list',
                        [Permissions.store_setting_detail]: 'Store setting detail',
                        [Permissions.store_setting_add]: 'Store setting add',
                        [Permissions.store_setting_edit]: 'Store setting edit',
                        [Permissions.store_setting_delete]: 'Store setting delete',
                    },
                },
                {
                    group: 'Banner',
                    items: {
                        [Permissions.banner_list]: 'Banner list',
                        [Permissions.banner_detail]: 'Banner detail',
                        [Permissions.banner_add]: 'Banner add',
                        [Permissions.banner_edit]: 'Banner edit',
                        [Permissions.banner_delete]: 'Banner delete',
                    },
                },
                {
                    group: 'Banner Layout',
                    items: {
                        [Permissions.banner_layout_list]: 'Banner layout list',
                        [Permissions.banner_layout_detail]: 'Banner layout detail',
                        [Permissions.banner_layout_add]: 'Banner layout add',
                        [Permissions.banner_layout_edit]: 'Banner layout edit',
                        [Permissions.banner_layout_delete]: 'Banner layout delete',
                    },
                },
                {
                    group: 'Banner Group',
                    items: {
                        [Permissions.banner_group_list]: 'Banner group list',
                        [Permissions.banner_group_detail]: 'Banner group detail',
                        [Permissions.banner_group_add]: 'Banner group add',
                        [Permissions.banner_group_edit]: 'Banner group edit',
                        [Permissions.banner_group_delete]: 'Banner group delete',
                    },
                },
                {
                    group: 'Product Prop Cat',
                    items: {
                        [Permissions.product_prop_cat_list]: 'Product prop cat list',
                        [Permissions.product_prop_cat_detail]: 'Product prop cat detail',
                        [Permissions.product_prop_cat_add]: 'Product prop cat add',
                        [Permissions.product_prop_cat_edit]: 'Product prop cat edit',
                        [Permissions.product_prop_cat_delete]: 'Product prop cat delete',
                    },
                },
                {
                    group: 'Product',
                    items: {
                        [Permissions.product_list]: 'Product list',
                        [Permissions.product_detail]: 'Product detail',
                        [Permissions.product_add]: 'Product add',
                        [Permissions.product_edit]: 'Product edit',
                        [Permissions.product_delete]: 'Product delete',
                    },
                },
                {
                    group: 'Product Prop',
                    items: {
                        [Permissions.product_prop_list]: 'Product prop list',
                        [Permissions.product_prop_detail]: 'Product prop detail',
                        [Permissions.product_prop_add]: 'Product prop add',
                        [Permissions.product_prop_edit]: 'Product prop edit',
                        [Permissions.product_prop_delete]: 'Product prop delete',
                    },
                },
                {
                    group: 'Order',
                    items: {
                        [Permissions.order_list]: 'Order list',
                        [Permissions.order_detail]: 'Order detail',
                        [Permissions.order_add]: 'Order add',
                        [Permissions.order_edit]: 'Order edit',
                        [Permissions.order_delete]: 'Order delete',
                    },
                },
                {
                    group: 'Order Status',
                    items: {
                        [Permissions.order_status_list]: 'Order status list',
                        [Permissions.order_status_detail]: 'Order status detail',
                        [Permissions.order_status_add]: 'Order status add',
                        [Permissions.order_status_edit]: 'Order status edit',
                        [Permissions.order_status_delete]: 'Order status delete',
                    },
                },
                {
                    group: 'Menu',
                    items: {
                        [Permissions.menu_list]: 'Menu list',
                        [Permissions.menu_detail]: 'Menu detail',
                        [Permissions.menu_add]: 'Menu add',
                        [Permissions.menu_edit]: 'Menu edit',
                        [Permissions.menu_delete]: 'Menu delete',
                    },
                },
				{
                    group: 'Message',
                    items: {
                        [Permissions.message_list]: 'Message list',
                        [Permissions.message_detail]: 'Message detail',
                        [Permissions.message_add]: 'Message add',
                        [Permissions.message_edit]: 'Message edit',
                        [Permissions.message_delete]: 'Message delete',
                    },
                },
				{
                    group: 'Package',
                    items: {
                        [Permissions.package_list]: 'Package list',
                        [Permissions.package_detail]: 'Package detail',
                        [Permissions.package_add]: 'Package add',
                        [Permissions.package_edit]: 'Package edit',
                        [Permissions.package_delete]: 'Package delete',
                    },
                },
                {
                    group: 'Ticket',
                    items: {
                        [Permissions.ticket_list]: 'Ticket list',
                        [Permissions.ticket_detail]: 'Ticket detail',
                        [Permissions.ticket_add]: 'Ticket add',
                        [Permissions.ticket_edit]: 'Ticket edit',
                        [Permissions.ticket_delete]: 'Ticket delete',
                    },
                },
                {
                    group: 'Email Report',
                    items: {
                        [Permissions.email_report_list]: 'Email Report list',
                        [Permissions.email_report_detail]: 'Email Report detail',
                        [Permissions.email_report_add]: 'Email Report add',
                        [Permissions.email_report_edit]: 'Email Report edit',
                        [Permissions.email_report_delete]: 'Email Report delete',
                    },
                },
            ],
            except: [],
        };
    }
}

export enum Permissions {
    /*
    Setting
     */
    setting_list = 'setting_list',
    setting_update = 'setting_update',

    /*
    File manager
    */
    file_manager_list = 'file_manager_list',
    file_manager_detail = 'file_manager_detail',
    file_manager_add = 'file_manager_add',
    file_manager_edit = 'file_manager_edit',
    file_manager_delete = 'file_manager_delete',

    /*
    Zone province
     */
    zone_province_list = 'zone_province_list',
    zone_province_detail = 'zone_province_detail',
    zone_province_add = 'zone_province_add',
    zone_province_edit = 'zone_province_edit',
    zone_province_delete = 'zone_province_delete',
    zone_province_sync = 'zone_province_sync',

    /*
    Zone district
     */
    zone_district_list = 'zone_district_list',
    zone_district_detail = 'zone_district_detail',
    zone_district_add = 'zone_district_add',
    zone_district_edit = 'zone_district_edit',
    zone_district_delete = 'zone_district_delete',
    zone_district_sync = 'zone_district_sync',

    /*
    Zone ward
     */
    zone_ward_list = 'zone_ward_list',
    zone_ward_detail = 'zone_ward_detail',
    zone_ward_add = 'zone_ward_add',
    zone_ward_edit = 'zone_ward_edit',
    zone_ward_delete = 'zone_ward_delete',
    zone_ward_sync = 'zone_ward_sync',

    /*
    * Page
    * */
    page_list = 'page_list',
    page_detail = 'page_detail',
    page_edit = 'page_edit',

    /*
    User
     */
    user_list = 'user_list',
    user_detail = 'user_detail',
    user_add = 'user_add',
    user_edit = 'user_edit',
    user_delete = 'user_delete',

    /*
    Role
     */
    role_list = 'role_list',
    role_detail = 'role_detail',
    role_add = 'role_add',
    role_edit = 'role_edit',
    role_delete = 'role_delete',

    /*
    Customer
    */
    customer_list = 'customer_list',
    customer_detail = 'customer_detail',
    customer_add = 'customer_add',
    customer_edit = 'customer_edit',
    customer_delete = 'customer_delete',

    /*
    Project
   */
    project_list = 'project_list',
    project_detail = 'project_detail',
    project_add = 'project_add',
    project_edit = 'project_edit',
    project_delete = 'project_delete',

    /*
    Log
   */
    log_list = 'log_list',

    /*
    * Job Contract
    * */
    job_contract_list = 'contract_list',
    job_contract_detail = 'contract_detail',
    job_contract_add = 'contract_add',
    job_contract_edit = 'contract_edit',
    job_contract_delete = 'contract_delete',

    /*
    * Job Department
    * */
    job_department_list = 'job_department_list',
    job_department_detail = 'job_department_detail',
    job_department_add = 'job_department_add',
    job_department_edit = 'job_department_edit',
    job_department_delete = 'job_department_delete',

    /*
    * Job location
    * */
    job_location_list = 'job_location_list',
    job_location_detail = 'job_location_detail',
    job_location_add = 'job_location_add',
    job_location_edit = 'job_location_edit',
    job_location_delete = 'job_location_delete',

    /*
    * Job
    * */
    job_list = 'job_list',
    job_detail = 'job_detail',
    job_add = 'job_add',
    job_edit = 'job_edit',
    job_delete = 'job_delete',

    /*
    * Job Applicant
    * */
    job_applicant_list = 'job_applicant_list',
    job_applicant_detail = 'job_applicant_detail',
    job_applicant_add = 'job_applicant_add',
    job_applicant_edit = 'job_applicant_edit',
    job_applicant_delete = 'job_applicant_delete',

    /*
    * Job Setting
    * */
    job_setting_list = 'job_setting_list',
    job_setting_detail = 'job_setting_detail',
    job_setting_add = 'job_setting_add',
    job_setting_edit = 'job_setting_edit',
    job_setting_delete = 'job_setting_delete',

    /*
    Product
    */
    product_category_list = 'product_category_list',
    product_category_detail = 'product_category_detail',
    product_category_add = 'product_category_add',
    product_category_edit = 'product_category_edit',
    product_category_delete = 'product_category_delete',

    /*
    * Slide
    * */
    slide_list = 'slide_list',
    slide_detail = 'slide_detail',
    slide_add = 'slide_add',
    slide_edit = 'slide_edit',
    slide_delete = 'slide_delete',

    /*
    * Tag
    * */
    tag_list = 'tag_list',
    tag_detail = 'tag_detail',
    tag_add = 'tag_add',
    tag_edit = 'tag_edit',
    tag_delete = 'tag_delete',

    /*
    * Post Category
    * */
    post_category_list = 'post_category_list',
    post_category_detail = 'post_category_detail',
    post_category_add = 'post_category_add',
    post_category_edit = 'post_category_edit',
    post_category_delete = 'post_category_delete',

    /*
    * Post
    * */
    post_list = 'post_list',
    post_detail = 'post_detail',
    post_add = 'post_add',
    post_edit = 'post_edit',
    post_delete = 'post_delete',

     /*
    * Editorial Category
    * */
     editorial_category_list = 'editorial_category_list',
     editorial_category_detail = 'editorial_category_detail',
     editorial_category_add = 'editorial_category_add',
     editorial_category_edit = 'editorial_category_edit',
     editorial_category_delete = 'editorial_category_delete',

     /*
     * Editorial
     * */
     editorial_list = 'editorial_list',
     editorial_detail = 'editorial_detail',
     editorial_add = 'editorial_add',
     editorial_edit = 'editorial_edit',
     editorial_delete = 'editorial_delete',

    /*
     * Editorial Setting
     * */
    editorial_setting_list = 'editorial_setting_list',
    editorial_setting_detail = 'editorial_setting_detail',
    editorial_setting_add = 'editorial_setting_add',
    editorial_setting_edit = 'editorial_setting_edit',
    editorial_setting_delete = 'editorial_setting_delete',

    /*
    Contact
    */
    contact_list = 'contact_list',
    contact_detail = 'contact_detail',
    contact_add = 'contact_add',
    contact_edit = 'contact_edit',
    contact_delete = 'contact_delete',

    /*
    Subscribe
    */
    subscribe_list = 'subscribe_list',
    subscribe_detail = 'subscribe_detail',
    subscribe_add = 'subscribe_add',
    subscribe_edit = 'subscribe_edit',
    subscribe_delete = 'subscribe_delete',
    /**
     * Payment method
     */
    payment_method_list = 'payment_method_list',
    payment_method_detail = 'payment_method_detail',
    payment_method_add = 'payment_method_add',
    payment_method_edit = 'payment_method_edit',
    payment_method_delete = 'payment_method_delete',
    /**
     * Delivery method
     */
     delivery_method_list = 'delivery_method_list',
     delivery_method_detail = 'delivery_method_detail',
     delivery_method_add = 'delivery_method_add',
     delivery_method_edit = 'delivery_method_edit',
     delivery_method_delete = 'delivery_method_delete',
    /**
     * Shipping fee
     */
    shipping_fee_list = 'shipping_fee_list',
    shipping_fee_detail = 'shipping_fee_detail',
    shipping_fee_add = 'shipping_fee_add',
    shipping_fee_edit = 'shipping_fee_edit',
    shipping_fee_delete = 'shipping_fee_delete',
    /**
     * Area
     */
     area_list = 'area_list',
     area_detail = 'area_detail',
     area_add = 'area_add',
     area_edit = 'area_edit',
     area_delete = 'area_delete',
    /**
     * Promotion
     */
     promotion_list = 'promotion_list',
     promotion_detail = 'promotion_detail',
     promotion_add = 'promotion_add',
     promotion_edit = 'promotion_edit',
     promotion_delete = 'promotion_delete',

    /*
    * Partner
    * */
    partner_list = 'partner_list',
    partner_detail = 'partner_detail',
    partner_add = 'partner_add',
    partner_edit = 'partner_edit',
    partner_delete = 'partner_delete',


    /*
    * Partner Setting
    * */
    partner_setting_detail = 'partner_setting_detail',
    partner_setting_edit = 'partner_setting_edit',


    /**
     * Customer care
     */
    customer_care_list = 'customer_care_list',
    customer_care_detail = 'customer_care_detail',
    customer_care_add = 'customer_care_add',
    customer_care_edit = 'customer_care_edit',
    customer_care_delete = 'customer_care_delete',
    /**
    * Customer care type
    */
    customer_care_type_list = 'customer_care_type_list',
    customer_care_type_detail = 'customer_care_type_detail',
    customer_care_type_add = 'customer_care_type_add',
    customer_care_type_edit = 'customer_care_type_edit',
    customer_care_type_delete = 'customer_care_type_delete',
    /**
    * Customer care setting
    */
    customer_care_setting_list = 'customer_care_setting_list',
    customer_care_setting_detail = 'customer_care_setting_detail',
    customer_care_setting_add = 'customer_care_setting_add',
    customer_care_setting_edit = 'customer_care_setting_edit',
    customer_care_setting_delete = 'customer_care_setting_delete',
    /**
    * Store
    */
    store_list = 'store_list',
    store_detail = 'store_detail',
    store_add = 'store_add',
    store_edit = 'store_edit',
    store_delete = 'store_delete',
    /**
    * Store setting
    */
    store_setting_list = 'store_setting_list',
    store_setting_detail = 'store_setting_detail',
    store_setting_add = 'store_setting_add',
    store_setting_edit = 'store_setting_edit',
    store_setting_delete = 'store_setting_delete',
    /**
    * Banner
    */
    banner_list = 'banner_list',
    banner_detail = 'banner_detail',
    banner_add = 'banner_add',
    banner_edit = 'banner_edit',
    banner_delete = 'banner_delete',
    /**
    * Banner Layout
    */
    banner_layout_list = 'banner_layout_list',
    banner_layout_detail = 'banner_layout_detail',
    banner_layout_add = 'banner_layout_add',
    banner_layout_edit = 'banner_layout_edit',
    banner_layout_delete = 'banner_layout_delete',
    /**
    * Banner Group
    */
    banner_group_list = 'banner_group_list',
    banner_group_detail = 'banner_group_detail',
    banner_group_add = 'banner_group_add',
    banner_group_edit = 'banner_group_edit',
    banner_group_delete = 'banner_group_delete',
    /**
    * Product Prop Cat
    */
     product_prop_cat_list = 'product_prop_cat_list',
     product_prop_cat_detail = 'product_prop_cat_detail',
     product_prop_cat_add = 'product_prop_cat_add',
     product_prop_cat_edit = 'product_prop_cat_edit',
     product_prop_cat_delete = 'product_prop_cat_delete',
    /**
    * Product
    */
    product_list = 'product_list',
    product_detail = 'product_detail',
    product_add = 'product_add',
    product_edit = 'product_edit',
    product_delete = 'product_delete',
    /**
    * Product  Prop
    */
    product_prop_list = 'product_prop_list',
    product_prop_detail = 'product_prop_detail',
    product_prop_add = 'product_prop_add',
    product_prop_edit = 'product_prop_edit',
    product_prop_delete = 'product_prop_delete',
    /**
    * Order
    */
    order_list = 'order_list',
    order_detail = 'order_detail',
    order_add = 'order_add',
    order_edit = 'order_edit',
    order_delete = 'order_delete',
    /**
    * Order
    */
     order_status_list = 'order_status_list',
     order_status_detail = 'order_status_detail',
     order_status_add = 'order_status_add',
     order_status_edit = 'order_status_edit',
     order_status_delete = 'order_status_delete',
    /**
    * Order
    */
    menu_list = 'menu_list',
    menu_detail = 'menu_detail',
    menu_add = 'menu_add',
    menu_edit = 'menu_edit',
    menu_delete = 'menu_delete',
	/**
    * Message
    */
	 message_list = 'message_list',
	 message_detail = 'message_detail',
	 message_add = 'message_add',
	 message_edit = 'message_edit',
	 message_delete = 'message_delete',
	 /**
    * Package
    */
	  package_list = 'package_list',
	  package_detail = 'package_detail',
	  package_add = 'package_add',
	  package_edit = 'package_edit',
	  package_delete = 'package_delete',
       /**
    * Ticket
    */
	  ticket_list = 'ticket_list',
	  ticket_detail = 'ticket_detail',
	  ticket_add = 'ticket_add',
	  ticket_edit = 'ticket_edit',
	  ticket_delete = 'ticket_delete',
        /**
    * Email Report
    */
	  email_report_list = 'email_report_list',
	  email_report_detail = 'email_report_detail',
	  email_report_add = 'email_report_add',
	  email_report_edit = 'email_report_edit',
	  email_report_delete = 'email_report_delete',
}
