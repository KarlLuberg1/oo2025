package ee.karl.veebipood.exception;

import lombok.Data;

import java.util.Date;

@Data // tema sees on @getter @setter @noargsconstrucor
public class ErrorMessage {
    private String message;
    private Date timestamp;
    private int status;
}
