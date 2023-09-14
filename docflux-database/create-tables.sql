CREATE TABLE Templates (
    id SERIAL PRIMARY KEY,
    uuid varchar(255),
    title varchar(255),
    pdf_filename varchar(255)
)

INSERT INTO Templates ('1111', 'Private Customers 2023 - Finnish', 'contract.pdf')
INSERT INTO Templates ('2222', 'Corporate Customers 2023 - Finnish', 'contract.pdf')