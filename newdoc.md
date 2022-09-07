## Institution creation flow;

# the first accout to create an institution becaomes the main admin for the institiution;
# create a tabe for institution data and user data;



for institution table:

institution_code,
institution_name,
company_url,
email,
phone,
country_code,
company_address,
country_mname,
state,
LGA,//LGA/Province
city,
zip_code,
logo_url;

# on creating institution, use the same email and password to create a user as the institutionAdmin in the user_table

for company settings table;

institution_code,
services:[//list of services the company is signing up for
    hr/payrol,
 pension, 
 payment:{// this is a service with settings in it;
    settings:{
        noOfApprovers:1,
        noOfAuthorizers:Number,
        approvalMehtod:Number, 
        authorizerMethod:Number, 
        showFee:boolean
        }
        },
 expenditure
 ],
next_level_approvals:boolean,// if true next level spprovsl will be required in all processes;
2fA:Boolean// required for users and staff;




users group// this will contain group of users;
{name:'Bank users,
id:1}


users table;

name:// this should be the email,
pasword:String,
passwordExpiryDate,
name_of_user://if it is the first user, use company name.
photoUrl,
phone,
institution_code,
user_group_id:// from user group above,
createOn,
createdBy,
status// if user is active ir not.
firstLogin:Boolean,
isEmployee:Boolean,
employee_verification_number:// this is required if the user is an employee;
emai_validation:1/0,
date_of_email_validation,
phone_validation:1/0,
date_of_phone_validation,



tokens:// this is for email and phone validations

token:
institution_code,
phone/email,
expiration_date:,
status://uses or not,
used_on: timestamp,




